/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-02-01 12:15:43
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-02-01 17:04:02
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

export {
    drawImgTo
}
/*
x -0.5
y -0.5
w 1
h 1
*/

let global_textures_unit = 0;
async function drawImgTo(id,image,x,y,w,h){
    console.dir(image)
    let VSHADER_SOURCE = await downloadShader('./glslUtil/poin.glsl');
    let FSHADER_SOURCE = await downloadShader('./glslUtil/farg.glsl');
    let gl = init(id,VSHADER_SOURCE, FSHADER_SOURCE);
    initTextures(gl, image,global_textures_unit);
    transferUniformData(gl,'u_Sampler','1i',global_textures_unit)
    // global_textures_unit++;
    bindBuffer(gl, [
        // Vertex coordinates, texture coordinate
        x, y+h, 0.0, h,
        x, y, 0.0, 0.0,
        x+w, y+h, w, h,
        x+w, y, w, 0.0,
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


    var u_chose_pos = {x:0.0,y:0.0};
    
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
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle
}