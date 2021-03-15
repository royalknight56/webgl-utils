/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2020-11-28 10:07:43
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-02-12 17:58:09
 */
import {
    init,//初始化
    initContext,
    downloadShader,//下载着色器文件
    bindBuffer,//绑定数据到缓冲区
    bufferToData,//缓冲区中数据指向变量
    transferUniformData,//传输uniform变量值
    initTextures,//初始化纹理
    getGLImageData,//获取图片数据
    putGLImageData,
} from './jsUtil/glutils.js'

import {
    drawImgTo,
    downloadImage,//下载图片文件
    changeImageSize,
    changeImageContrast
} from './jsUtil/imgUtils.js'
import { perFrame } from './jsUtil/animationUtil.js';
import { Program } from './jsUtil/lib/program.js'
import { compileShader } from './jsUtil/lib/shader.js'
import {
    changeGlContrast,
    changeGlBrightness,
    changeGlSaturation,
    changeGlChannel,
    initImg
} from './jsUtil/glImgUtils.js'
import { initProgramImg } from './jsUtil/pro/proImgUtils.js';
main()
async function main() {

    let VSHADER_SOURCE = await downloadShader('./glslUtil/poin.glsl');
    let FSHADER_SOURCE = await downloadShader('./glslUtil/farg.glsl');

    // let gl = init('webgl', VSHADER_SOURCE, FSHADER_SOURCE);

    let gl = initContext('webgl')
    let pro = new Program(
        gl,
        compileShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE),
        compileShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE)
    )
    pro.bind()
    let image2 = await downloadImage('./resources/sky.JPG');
    let image3 = await downloadImage('./resources/brid.jpg');

    let finimage = await changeImageSize(image3, 256 * 256, 256 * 256)

    console.log(gl instanceof WebGLRenderingContext)
    console.log(pro)

    initProgramImg(pro, finimage)
    // initImg(gl, finimage)
    // let image = await downloadImage('./resources/quzao2_after.jpg');
    // let image2 = await downloadImage('./resources/sky.JPG');


    // let sx = 1;
    // let sy = 1;
    // drawImgTo('webgl', finimage, -1, -1, 1, 1, sx, sy);

    // let ox = -1;
    // let oy = -1;

    // let oxoff = 0.01;
    // let oyoff = -0.02

    let contra = 0.21;

    // // drawImgTo('datagl', finimage, ox, oy, 1, 1, sx, sy);
    // finimage = await  changeImageContrast(finimage, 0.2)

    // // console.log(finimage)
    // // document.body.appendChild(finimage)
    // drawImgTo('datagl', finimage, ox, oy, 1, 1, sx, sy);
    // changeGlSaturation(gl, 0.1)

    // changeGlChannel(gl,4);
    let i = 0;
    setInterval(() => {
        i++;
        i %= 5
        contra += 0.001
        contra %= 2
        changeGlChannel(gl, i);

        changeGlBrightness(gl, contra)

    }, 1000)
    // perFrame(async () => {
    //     contra += 0.001
    //     contra %= 2
    //     // changeGlContrast(gl, contra)
    //     // changeGlBrightness(gl, contra)
    //     changeGlSaturation(gl, contra)
    // })
}



