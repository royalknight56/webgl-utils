/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-02-06 17:09:57
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-02-09 19:55:51
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
    changeGlContrast,
    changeGlBrightness,
    changeGlSaturation,

    changeGlChannel,

    initImg,
}

let VSHADER_SOURCE = '';
let FSHADER_SOURCE = '';

(async function () {
    VSHADER_SOURCE = await downloadShader('./glslUtil/poin.glsl');
    FSHADER_SOURCE = await downloadShader('./glslUtil/farg.glsl');
})()//下载着色器文件


async function changeGlContrast(gl, contrast) {

    var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    var BCS = { b: 1.0, c: contrast, s: 1.0 };

    // transferUniformData(gl, 'u_RGB_color', '4f', RGBA.r, RGBA.g, RGBA.b, RGBA.a)

    // transferUniformData(gl, 'u_brightness', '1f', BCS.b)
    transferUniformData(gl, 'u_contrast', '1f', BCS.c)
    // transferUniformData(gl, 'u_saturation', '1f', BCS.s)

    gl.clearColor(0, 0, 0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle

    return null;
}

async function changeGlBrightness(gl, brightness) {

    // var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    var BCS = { b: brightness, c: 1.0, s: 1.0 };

    // transferUniformData(gl, 'u_RGB_color', '4f', RGBA.r, RGBA.g, RGBA.b, RGBA.a)

    transferUniformData(gl, 'u_brightness', '1f', BCS.b)
    // transferUniformData(gl, 'u_contrast', '1f', BCS.c)
    // transferUniformData(gl, 'u_saturation', '1f', BCS.s)

    gl.clearColor(0, 0, 0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle

    return null;
}

async function changeGlSaturation(gl, saturation) {

    // var RGBA = { r: 0.0, g: 0.0, b: 0.0, a: 0 }
    var BCS = { b: 1.0, c: 1.0, s: saturation };

    // transferUniformData(gl, 'u_RGB_color', '4f', RGBA.r, RGBA.g, RGBA.b, RGBA.a)

    // transferUniformData(gl, 'u_brightness', '1f', BCS.b)
    // transferUniformData(gl, 'u_contrast', '1f', BCS.c)
    transferUniformData(gl, 'u_saturation', '1f', BCS.s)

    gl.clearColor(0, 0, 0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle

    return null;
}

function changeGlChannel(gl, channel) {
    transferUniformData(gl, 'u_channel', '1i', channel)
    gl.clearColor(0, 0, 0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle

    return null;
}

let global_textures_unit = 0
function initImg(gl, image, x = -1, y = -1, w = 1, h = 1, sx = 2, sy = 2) {
    initTextures(gl, image, global_textures_unit);
    transferUniformData(gl, 'u_Sampler', '1i', global_textures_unit)

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

    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle


}
