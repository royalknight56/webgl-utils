/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-18 21:25:55
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-19 14:31:53
 */

import {
    createBuffer,
    bindBuffer,//绑定数据到缓冲区
    bufferToData,//缓冲区中数据指向变量
    transferUniformData,//传输uniform变量值
    initTextures,//初始化纹理
    texImage2D,
} from '../glutils.js'

export {
    changeGlContrast,
    changeGlBrightness,
    changeGlSaturation,

    changeGlChannel,
    changeGlImgRGBA,

    changeGlImgPos,

    initData,
    initProgramData,
    initProgramImg,
    changeProgramImg,

    getImgData,
    putImgData
}



let global_textures_unit = 0

function initData(pro, x = -1, y = -1, w = 1, h = 1, sx = 2, sy = 2) {
    let gl = pro.gl
    gl.uniform1i(pro.uniforms.u_Sampler, global_textures_unit);
    let buffer = createBuffer(pro.gl, 'ARRAY_BUFFER')

    // bindBuffer(pro.gl, [//图片大小位置buffer
    //     // Vertex coordinates, texture coordinate
    //     x, y + sy * h, 0.0, h,
    //     x, y, 0.0, 0.0,
    //     x + sx * w, y + sy * h, w, h,
    //     x + sy * w, y, w, 0.0,
    // ], {
    //     area: 'ARRAY_BUFFER',
    // },buffer);

    return buffer
}


/**
 * @name: drawImgTo 把图片(必须是方形256*256)绘制到指定canvas上
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
function initProgramData(pro, x = -1, y = -1, w = 1, h = 1, sx = 2, sy = 2) {
    let gl = pro.gl

    bindBuffer(pro.gl, [//图片大小位置buffer
        // Vertex coordinates, texture coordinate
        x, y + sy * h, 0.0, h,
        x, y, 0.0, 0.0,
        x + sx * w, y + sy * h, w, h,
        x + sy * w, y, w, 0.0,
    ], {
        area: 'ARRAY_BUFFER',
    }, pro.buffer);
    bufferToData(pro, {
        name: 'a_Position',
        type: 'FLOAT',
        length: 2,
        stride: 4,
        offset: 0
    })
    bufferToData(pro, {
        name: 'a_TexCoord',
        type: 'FLOAT',
        length: 2,
        stride: 4,
        offset: 2
    })

    var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    var BCS = { b: 1.0, c: 1.0, s: 1.0 };

    transferUniformData(pro, 'u_RGB_color', '4f', RGBA.r, RGBA.g, RGBA.b, RGBA.a)

    transferUniformData(pro, 'u_brightness', '1f', BCS.b)
    transferUniformData(pro, 'u_contrast', '1f', BCS.c)
    transferUniformData(pro, 'u_saturation', '1f', BCS.s)

    initTextures(gl, global_textures_unit);

}
function initProgramImg(pro, image) {
    let gl = pro.gl
    texImage2D(gl, image)

}
function changeProgramImg(pro, image) {
    let gl = pro.gl
    texImage2D(gl, image)
}
function changeGlImgPos(pro, x = -1, y = -1, w = 1, h = 1, sx = 2, sy = 2) {
    let gl = pro.gl

    bindBuffer(pro.gl, [//图片大小位置buffer
        // Vertex coordinates, texture coordinate
        x, y + sy * h, 0.0, h,
        x, y, 0.0, 0.0,
        x + sx * w, y + sy * h, w, h,
        x + sy * w, y, w, 0.0,
    ], {
        area: 'ARRAY_BUFFER',
    }, pro.buffer);
    bufferToData(pro, {
        name: 'a_Position',
        type: 'FLOAT',
        length: 2,
        stride: 4,
        offset: 0
    })
    bufferToData(pro, {
        name: 'a_TexCoord',
        type: 'FLOAT',
        length: 2,
        stride: 4,
        offset: 2
    })

    return null;
}

function changeGlImgState(pro, state) {
    let gl = pro.gl
    // var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    // var BCS = { b: 1.0, c: contrast, s: 1.0 };

    // transferUniformData(gl, 'u_RGB_color', '4f', RGBA.r, RGBA.g, RGBA.b, RGBA.a)

    transferUniformData(pro, 'u_brightness', '1f', state.b)
    transferUniformData(pro, 'u_contrast', '1f', state.c)
    transferUniformData(pro, 'u_saturation', '1f', state.s)

    return null;
}
function changeGlImgRGBA(pro, rgba) {
    let gl = pro.gl
    // var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    // var BCS = { b: 1.0, c: contrast, s: 1.0 };

    transferUniformData(pro, 'u_RGB_color', '4f', rgba.r, rgba.g, rgba.b, rgba.a)

    // transferUniformData(pro, 'u_brightness', '1f', state.b)
    // transferUniformData(pro, 'u_contrast', '1f', state.c)
    // transferUniformData(pro, 'u_saturation', '1f', state.s)

    return null;
}

function changeGlContrast(pro, contrast) {

    changeGlImgState(pro, { b: pro.state.prop.b, c: contrast, s: pro.state.prop.s })

}

function changeGlBrightness(pro, brightness) {

    changeGlImgState(pro, { b: brightness, c: pro.state.prop.c, s: pro.state.prop.s })
}

function changeGlSaturation(pro, saturation) {

    changeGlImgState(pro, { b: pro.state.prop.b, c: pro.state.prop.c, s: saturation })
}


function changeGlChannel(pro, channel) {
    let gl = pro.gl
    transferUniformData(pro, 'u_channel', '1i', channel)


    return null;
}

function getImgData(pro, x = 0, y = 0, width = 500, height = 500) {
    let gl = pro.gl
    // let uarr = Uint8ClampedArray.from(pix)
    // let imgdata = new ImageData(uarr, w, h)

    let pixels = new Uint8ClampedArray(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    let imgdata = new ImageData(pixels, gl.drawingBufferWidth)

    return imgdata

}

function putImgData(pro, imgData, x = 0, y = 0, width = 500, height = 500) {
    let gl = pro.gl
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgData);
}