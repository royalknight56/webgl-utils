/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-18 22:26:05
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-18 22:37:40
 */
export {
    downloadImage,
    downloadShader,

    changeImageSize
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
