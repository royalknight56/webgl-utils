/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-02-09 11:58:46
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-02-10 17:09:08
 */

function getUniforms (gl,program) {
    let uniforms = [];
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
}

function createProgram (gl,vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

    return program;
}

export class Program {
    constructor (gl,vertexShader, fragmentShader) {
        this.uniforms = {};
        this.gl  = gl;
        this.program = createProgram(gl,vertexShader, fragmentShader);
        this.uniforms = getUniforms(gl,this.program);
    }

    bind () {
        this.gl.useProgram(this.program);
    }
}


