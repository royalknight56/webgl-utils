/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2020-11-28 10:07:43
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-02-01 17:03:09
 */
import {
    init,//初始化
    downloadShader,//下载着色器文件
    downloadImage,//下载图片文件
    bindBuffer,//绑定数据到缓冲区
    bufferToData,//缓冲区中数据指向变量
    transferUniformData,//传输uniform变量值
    initTextures,//初始化纹理
    getGLImageData,//获取图片数据
    putGLImageData,
} from './glutils.js'

import {drawImgTo} from './imgUtils.js'

main()
async function main() {

    let VSHADER_SOURCE = await downloadShader('./poin.glsl');
    let FSHADER_SOURCE = await downloadShader('./farg.glsl');

    let gl = init('webgl',VSHADER_SOURCE, FSHADER_SOURCE);
    // bindData(gl);
    let image = await downloadImage('./resources/quzao2_after.jpg');
    let image2 = await downloadImage('./resources/sky.JPG');
    let image3 = await downloadImage('./resources/brid.jpg');
    
    // initTextures(gl, image,0);
    // transferUniformData(gl,'u_Sampler','1i',0)


    await drawImgTo('webgl',image,-1,-1,1,1)

    await drawImgTo('webgl',image3,-1,0,1,1)

    // drawImg(gl,4,u_chose_pos);

    // var u_chose_pos = {x:0.0,y:0.0};
    // document.addEventListener('mousedown',(e)=>{

    //     u_chose_pos.x=(e.offsetX-100)/200
    //     u_chose_pos.y=-(e.offsetY-100)/200

    //     drawImg(gl,4,u_chose_pos);

    //     let dele = document.getElementById('datagl')
    //     let dcon = dele.getContext('2d')
    //     let data = getGLImageData(gl,0,0,300,200)
    //     putGLImageData(dcon, data,0,0,300,200)

    // })

    //绘制操作
    
}



function drawImg(gl,n,u_chose_pos) {
    // gl.clearColor(r, g, b, a);

    var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    var parIfGauss = true;
    
    var BCS = { b: 1.0, c: 1.0, s: 1.0 };

    transferUniformData(gl, 'u_chose_pos', '2f', u_chose_pos.x, u_chose_pos.y)
    
    transferUniformData(gl, 'u_RGB_color', '4f', RGBA.r, RGBA.g, RGBA.b, RGBA.a)
    transferUniformData(gl, 'u_ifGauss', '1i', parIfGauss)

    // transferUniformData(gl, 'u_image_change', '1i', u_image_change)
    

    transferUniformData(gl, 'u_brightness', '1f', BCS.b)
    transferUniformData(gl, 'u_contrast', '1f', BCS.c)
    transferUniformData(gl, 'u_saturation', '1f', BCS.s)
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
}



/**
 * @name: bindData
 * @param {*}
 * @return {*}
 * @Date: 2020-11-28 10:56:12
 * @LastEditors: RoyalKnight
 */
function bindData(gl) {
    bindBuffer(gl, [
        // Vertex coordinates, texture coordinate
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0,
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
}





