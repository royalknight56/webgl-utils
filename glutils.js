/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2020-11-29 11:11:40
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-02-01 11:49:36
 */
export {
    init,//初始化
    downloadShader,//下载着色器文件
    downloadImage,//下载图片文件
    bindBuffer,//绑定数据到缓冲区
    bufferToData,//缓冲区中数据指向变量
    transferUniformData,//传输uniform变量值
    initTextures,//初始化纹理

    getGLImageData,//获取图片数据
    putGLImageData

}



/**
* @name: 初始化函数
* @param {String} vshader 顶点着色器
* @param {String} fshader 片元着色器
* @return {gl} gl全局上下文
* @Date: 2020-11-28 10:09:01
* @LastEditors: RoyalKnight
*/

function init(id, vshader, fshader) {
    var canvas = document.getElementById(id);//获取canvas上下文

    /**
     * @name: 以下是getWebGLContext简写的内容
     * @param {*}canvas
     * @return {*}
     * @Date: 2020-11-28 10:16:57
     * @LastEditors: RoyalKnight
     */

    //create3DContext
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii]);
        } catch (e) { }
        if (context) {
            break;
        }
    }
    //setupWebGL
    if (!context) {
        if (!window.WebGLRenderingContext) {
            console.log('Error1')
        } else {
            console.log('Error2')
        }
    }
    //getWebGLContext
    var gl = context;
    if (!context) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    } else {

    }


    /**
     * @name: 以下是initShaders简写的内容
     * @param {*}gl 
     * @param {*}vshader 
     * @param {*}fshader
     * @return {*}
     * @Date: 2020-11-28 10:31:34
     * @LastEditors: RoyalKnight
     */



    function loadShader(gl, type, source) {
        // Create shader object
        var shader = gl.createShader(gl[type]);
        if (shader == null) {
            console.log('unable to create shader');
            return null;
        }

        // Set the shader program
        gl.shaderSource(shader, source);

        // Compile the shader
        gl.compileShader(shader);

        // Check the result of compilation
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }



    //*createProgram
    // Create a program object
    var program = context.createProgram();
    if (!program) {
        return null;
    }

    // Create shader object
    var vertexShader = loadShader(context, 'VERTEX_SHADER', vshader);
    var fragmentShader = loadShader(context, 'FRAGMENT_SHADER', fshader);
    if (!vertexShader || !fragmentShader) {
        return null;
    }



    // Attach the shader objects
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);

    // Link the program object
    context.linkProgram(program);

    // Check the result of linking
    var linked = context.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = context.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        context.deleteProgram(program);
        context.deleteShader(fragmentShader);
        context.deleteShader(vertexShader);
        return null;
    }

    //initShaders
    if (!program) {
        console.log('Failed to create program');
        return false;
    }

    context.useProgram(program);
    context.program = program;

    return context
    // // Initialize shaders
    // if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    //     console.log('Failed to intialize shaders.');
    //     return;
    // }

}

/**
 * @name: 下载着色器文件
 * @param {*} src
 * @return {*}
 * @Date: 2020-11-29 12:21:53
 * @LastEditors: RoyalKnight
 */
function downloadShader(src) {
    let resacc = null;
    let pro = new Promise((res, rej) => {
        resacc = res;
    })
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status !== 404) {
            resacc(req.responseText)
        }
    }
    req.open('GET', src, true);
    req.send();
    return pro;
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

/**
 * @name: 绑定数据到缓冲区
 * @param {gl} gl gl上下文
 * @param {Array} arrayData 数组数据
 * @param {Object} opt 选项
 * @return {*}
 * @Date: 2020-11-29 14:02:03
 * @LastEditors: RoyalKnight
 */

function bindBuffer(gl, arrayData, opt) {

    arrayData = new Float32Array(arrayData)
    // Create the buffer object
    var vertexTexCoordBuffer = gl.createBuffer();
    if (!vertexTexCoordBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl[opt.area], vertexTexCoordBuffer);
    gl.bufferData(gl[opt.area], arrayData, gl.STATIC_DRAW);

}


/**
 * @name: 缓冲区中数据指向变量
 * @param {gl} gl gl全局上下文
 * @param {Object} opt 选项
 * @return {*}
 * @Date: 2020-11-29 14:13:35
 * @LastEditors: RoyalKnight
 */
function bufferToData(gl, opt) {
    // var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    var FSIZE = 4;
    //Get the storage location of a_Position, assign and enable buffer
    var a_Position = gl.getAttribLocation(gl.program, opt.name);
    if (a_Position < 0) {
        console.log('Failed to get the storage location of ' + opt.name);
        return -1;
    }
    gl.vertexAttribPointer(a_Position, opt.length, gl[opt.type], false, FSIZE * opt.stride, FSIZE * opt.offset);
    gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object
}


/**
 * @name: 传输uniform数据
 * @param {*} gl gl全局上下文
 * @param {*} name 着色器中变量名称
 * @param {*} type 变量类型:'[1234][fiv]
 * @param {array} value 变量值
 * @return {*}
 * @Date: 2020-11-29 14:14:49
 * @LastEditors: RoyalKnight
 */
function transferUniformData(gl, name, type, ...value) {
    var u_RGB_color = gl.getUniformLocation(gl.program, name);
    if (u_RGB_color < 0) {
        console.log('Failed to get the storage location of ' + name);
        return -1;
    }
    gl['uniform' + type](u_RGB_color, ...value)
}

/**
 * @name: 初始化纹理
 * @param {*} gl gl全局上下文
 * @param {Image} image image图像
 * @param {Number} area area纹理单元:0,1,2,3
 * @return {*}
 * @Date: 2020-11-29 14:26:50
 * @LastEditors: RoyalKnight
 */
function initTextures(gl, image, area) {
    var texture = gl.createTexture();   // Create a texture object
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //翻转y轴 Flip the image's y axis
    // Enable texture unit0
    gl.activeTexture(gl['TEXTURE' + area]);
    // Bind the texture object to the target
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST_MIPMAP_LINEAR);

    // Set the texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
}

function getGLImageData(gl, x, y, w, h) {
    // let ele =document.getElementById(id)
    const pixels = new Uint8Array(w * h * 4);
    gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

    // make a temp buffer to hold one row
    var temp = new Uint8Array(w * 4);
    for (let i = 0; i < h/2; ++i) {
        var topOffset = i * w*4;
        var bottomOffset = (h - i - 1) * w*4;

        // make copy of a row on the top half
        temp.set(pixels.subarray(topOffset, topOffset + w*4));

        // copy a row from the bottom half to the top
        pixels.copyWithin(topOffset, bottomOffset, bottomOffset + w*4);

        // copy the copy of the top half row to the bottom half 
        pixels.set(temp, bottomOffset);
    }

    return pixels
}
function putGLImageData(gl, pix, x, y, w, h) {

    // let ele =document.getElementById(id)
    let uarr = Uint8ClampedArray.from(pix)
    let imgdata = new ImageData(uarr, w, h)
    gl.putImageData(imgdata, 0, 0)

    return true
}
function getGLImagePixelData(gl, x, y) {

    // let ele =document.getElementById(id)
    let uarr = Uint8ClampedArray.from(pix)
    let imgdata = new ImageData(uarr, w, h)
    gl.putImageData(imgdata, 0, 0)

    return true
}