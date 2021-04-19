/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-02-09 11:58:46
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-19 14:41:58
 */
import {
    initData,
    initProgramData,
    initProgramImg,
    changeGlContrast,
    changeGlBrightness,
    changeGlSaturation,
    changeGlChannel,
    changeGlImgRGBA,
    changeGlImgPos,
    changeProgramImg,

    getImgData,
    putImgData
} from "./program_fun/program_img.js"

import { farg, poin } from "../glslUtil/glsljson.js";

import {
    initContext,
} from './glutils.js'

import { compileShader } from './shader.js';

function getUniforms(gl, program) {
    let uniforms = [];
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
}

function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

    return program;
}

export class Program {
    /**
     * @name: 
     * @param {*} glid:元素的id
     * @param {*} gl:如果自己传入了gl,则直接使用该gl,glid无效
     * @return {*}
     * @LastEditors: RoyalKnight
     */
    constructor(glid,gl) {


        this.uniforms = {};
        this.gl = gl ?? initContext(glid);
        this.id = glid
        let vertexShader = compileShader(this.gl, this.gl.VERTEX_SHADER, poin)

        let fragmentShader = compileShader(this.gl, this.gl.FRAGMENT_SHADER, farg)

        this.state = {
            prop: { b: 1, c: 1, s: 1 },
            rgba: { r: 0, g: 0, b: 0, a: 0 }
        }

        this.program = createProgram(this.gl, vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.gl, this.program);
        this.gl.useProgram(this.program);
        this.buffer = initData(this)
        initProgramData(this)
        // this.initProgramData()

    }
    /**
     * @name: 执行绘制(清空颜色缓冲区,清空颜色,着色器执行)
     * @param {null} 无参数
     * @return {null}
     * @LastEditors: RoyalKnight
     */
    draw() {
        this.gl.clearColor(0, 0, 0, 0.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);   // Clear <canvas>
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle
    }

    /**
     * @name: 初始化程序图像
     * @param {Image} image
     * @return {null}
     * @LastEditors: RoyalKnight
     */
    initProgramImg(image) {
        initProgramImg(this, image)
    }

    /**
     * @name: 改变程序图像
     * @param {Image} image
     * @return {null}
     * @LastEditors: RoyalKnight
     */
    changeProgramImg(image){
        changeProgramImg(this,image)
    }
    /**
     * @name: 更改图像对比度
     * @param {Number} value(0.0~1.0)
     * @LastEditors: RoyalKnight
     */
    changeContrast(value) {
        changeGlContrast(this, value)
    }

    /**
     * @name: 更改图像亮度
     * @param {Number} value(0.0~1.0)
     * @LastEditors: RoyalKnight
     */
    changeBrightness(value) {
        changeGlBrightness(this, value)
    }
    /**
     * @name: 更改图像饱和度
     * @param {Number} value(0.0~1.0)
     * @LastEditors: RoyalKnight
     */
    changeSaturation(value) {
        changeGlSaturation(this, value)
    }

    /**
     * @name: 更改图像通道
     * @param {Number} value(0~4)
     * @LastEditors: RoyalKnight
     */
    changeChannel(value) {
        changeGlChannel(this, value)
    }

    /**
     * @name: 更改图像RGBA
     * @param {Number} value(0.0~1.0)
     * @LastEditors: RoyalKnight
     */
    changeGlImgRGBA(rgba) {
        changeGlImgRGBA(this, rgba)
    }

    /**
     * @name: 更改图像位置
     * @param {*} x:起点x
     * @param {*} y:起点y
     * @param {*} w:总宽度w
     * @param {*} h:总高度h
     * @param {*} sx:x轴缩放
     * @param {*} sy:y轴缩放
     * @return {*}
     * @LastEditors: RoyalKnight
     */
    changeGlImgPos(x = -1, y = -1, w = 1, h = 1, sx = 2, sy = 2) {
        changeGlImgPos(this, x, y, w, h, sx, sy)
    }

    /**
     * @name: 获得程序的ImageData
     * @param {*}
     * @return {ImageData}
     * @LastEditors: RoyalKnight
     */
    getImgData() {
        return getImgData(this)
    }

    /**
     * @name: 将ImageData放入程序
     * @param {ImageData}
     * @return {null}
     * @LastEditors: RoyalKnight
     */
    putImgData(image){
        putImgData(this,image)
    }

}


