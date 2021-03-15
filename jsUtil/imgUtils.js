/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-02-01 12:15:43
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-02-09 18:58:53
 */
import {
    init,//初始化
    downloadShader,//下载着色器文件
    bindBuffer,//绑定数据到缓冲区
    bufferToData,//缓冲区中数据指向变量
    transferUniformData,//传输uniform变量值
    initTextures,//初始化纹理
    getGLImageData,//获取图片数据
    putGLImageData,
} from './glutils.js'


export {
    drawImgTo,
    downloadImage,
    changeImageSize,
    changeImageContrast,
}

/**
 * @name: 改变图像大小,(传入canvas的图像必须为256*256)
 * @param {*} image 图片文件 imageDomElement
 * @param {*} width 改变后的宽度
 * @param {*} height 改变后的高度
 * @return {Promise} Promise(res(image),rej(null))
 * @Date: 2021-02-03 19:22:35
 * @LastEditors: RoyalKnight
 */
function changeImageSize(image, width, height) {
    let canvas = document.createElement('canvas')
    canvas.width = 256;
    canvas.height = 256;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, 256, 256)
    return downloadImage(canvas.toDataURL('image/jpeg'));
}





/*
x -0.5
y -0.5
w 1
h 1
*/
let global_textures_unit = 0;




let VSHADER_SOURCE = '';
let FSHADER_SOURCE = '';

(async function () {
    VSHADER_SOURCE = await downloadShader('./glslUtil/poin.glsl');
    FSHADER_SOURCE = await downloadShader('./glslUtil/farg.glsl');
    
})()//下载着色器文件



let glStateMap = {};
let glMap = {};

function registerGlMap(id, image) {
    let gl = null
    if (glStateMap[id] == 'NULL_STATE' || !glStateMap[id]) {

        gl = init(id, VSHADER_SOURCE, FSHADER_SOURCE);
        glMap[id] = gl;

        initTextures(gl, image, global_textures_unit);
        transferUniformData(gl, 'u_Sampler', '1i', global_textures_unit)
        glStateMap[id] = 'INITED_STATE'
    } else if (glStateMap[id] == 'INITED_STATE') {
        gl = glMap[id]
    }
    return gl
}

/**
 * @name: drawImgTo 把图片(必须是方形256*256)绘制到指定canvas上
 * @param {String} id canvas的Id
 * @param {imageDomElement} image 图片文件 imageDomElement
 * @param {Number} x 绘制起点x
 * @param {Number} y 绘制起点y
 * @param {Number} w 绘制宽度
 * @param {Number} h 绘制高度
 * @param {Number} sx 宽度缩放
 * @param {Number} sy 高度缩放
 * @return {*}
 * @Date: 2021-02-02 19:29:53
 * @LastEditors: RoyalKnight
 */
async function drawImgTo(id, image, x = -1, y = -1, w = 1, h = 1, sx = 1, sy = 1) {
    let gl = registerGlMap(id, image);

    // if (glStateMap[id] == 'NULL_STATE'||!glStateMap[id]) {

    //     gl = init(id, VSHADER_SOURCE, FSHADER_SOURCE);
    //     glMap[id]=gl;
    //     // image =await changeImageSize(image)

    //     initTextures(gl, image, global_textures_unit);
    //     transferUniformData(gl, 'u_Sampler', '1i', global_textures_unit)
    //     glStateMap[id] = 'INITED_STATE'
    // } else if (glStateMap[id] == 'INITED_STATE') {
    //     gl=glMap[id]
    // }


    let scaleX = sx;
    let scaleY = sy;
    bindBuffer(gl, [
        // Vertex coordinates, texture coordinate
        x, y + scaleY * h, 0.0, h,
        x, y, 0.0, 0.0,
        x + scaleX * w, y + scaleY * h, w, h,
        x + scaleX * w, y, w, 0.0,
    ], {
        area: 'ARRAY_BUFFER',
    });
    bufferToData(gl, {
        name: 'a_Position',
        type: 'FLOAT',
        length: 2,
        stride: 4,
        offset: 0
    })
    bufferToData(gl, {
        name: 'a_TexCoord',
        type: 'FLOAT',
        length: 2,
        stride: 4,
        offset: 2
    })


    var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    var BCS = { b: 1.0, c: 1.0, s: 1.0 };

    transferUniformData(gl, 'u_RGB_color', '4f', RGBA.r, RGBA.g, RGBA.b, RGBA.a)

    transferUniformData(gl, 'u_brightness', '1f', BCS.b)
    transferUniformData(gl, 'u_contrast', '1f', BCS.c)
    transferUniformData(gl, 'u_saturation', '1f', BCS.s)

    gl.clearColor(0, 0, 0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle
}


/**
 * @name: 下载图片文件
 * @param {*} src
 * @return {*}
 * @Date: 2020-11-29 12:21:53
 * @LastEditors: RoyalKnight
 */
function downloadImage(src) {
    return new Promise((res, rej) => {
        var image = new Image();  // Create the image object
        if (!image) {
            console.log('Failed to create the image object');
            rej()
            // return false;
        }
        // Register the event handler to be called on loading an image
        image.onload = function () {
            res(image);
        };
        // Tell the browser to load an image
        image.src = src;
    })
}

let testmark = true
let tempgl =null;
async function changeImageContrast(image, contrast, x = -1, y = -1, w = 1, h = 1, sx = 2, sy = 2) {

    let canvas = document.createElement('canvas', { id: 'tempCanvas', width: 256, height: 256 })

    canvas.width = 256;
    canvas.height = 256;

    
    if (testmark) {
        tempgl = init(canvas, VSHADER_SOURCE, FSHADER_SOURCE);

        initTextures(tempgl, image, global_textures_unit);
        transferUniformData(tempgl, 'u_Sampler', '1i', global_textures_unit)
        testmark = false
    } else {

    }


    let scaleX = sx;
    let scaleY = sy;
    bindBuffer(tempgl, [
        // Vertex coordinates, texture coordinate
        x, y + scaleY * h, 0.0, h,
        x, y, 0.0, 0.0,
        x + scaleX * w, y + scaleY * h, w, h,
        x + scaleX * w, y, w, 0.0,
    ], {
        area: 'ARRAY_BUFFER',
    });
    bufferToData(tempgl, {
        name: 'a_Position',
        type: 'FLOAT',
        length: 2,
        stride: 4,
        offset: 0
    })
    bufferToData(tempgl, {
        name: 'a_TexCoord',
        type: 'FLOAT',
        length: 2,
        stride: 4,
        offset: 2
    })


    var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    var BCS = { b: 1.0, c: contrast, s: 1.0 };

    transferUniformData(tempgl, 'u_RGB_color', '4f', RGBA.r, RGBA.g, RGBA.b, RGBA.a)

    transferUniformData(tempgl, 'u_brightness', '1f', BCS.b)
    transferUniformData(tempgl, 'u_contrast', '1f', BCS.c)
    transferUniformData(tempgl, 'u_saturation', '1f', BCS.s)

    tempgl.clearColor(0, 0, 0, 0.0);
    tempgl.clear(tempgl.COLOR_BUFFER_BIT);   // Clear <canvas>
    tempgl.drawArrays(tempgl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle

    return downloadImage(canvas.toDataURL('image/jpeg'));
}