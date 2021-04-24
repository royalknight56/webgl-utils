<!--
 * @Descripttion:
 * @version:
 * @Author: RoyalKnight
 * @Date: 2021-02-01 15:45:07
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-24 23:02:15
-->

# webgl-utils

webgl 工具函数库,可用于处理图片

# 引入

```js
import { Program } from "./jsUtil/program.js";
```

# 创建 Program 对象

```js
let pro = new Program("webgl");

Program(glid, gl);
/**
 * @name:构造函数
 * @param {*} glid:canvas元素的id
 * @param {*} gl:gl上下文,如果自己传入了gl上下文,则直接使用该gl,glid无效
 * @return {ProgramObj} ProgramObj
 */
```

# ProgramObj 属性

```js


    /**
     * @name: 执行此行代码会执行相应程序的绘制工作
     * @param {*}
     * @return {*}
     * @LastEditors: RoyalKnight
     */
    draw() {}

    /**
     * @name: 初始化程序图像
     * @param {Image} image
     * @return {null}
     * @LastEditors: RoyalKnight
     */
    initProgramImg(image)

    /**
     * @name: 改变程序图像
     * @param {Image} image
     * @return {null}
     * @LastEditors: RoyalKnight
     */
    changeProgramImg(image)
    /**
     * @name: 更改图像对比度
     * @param {Number} value(0.0~1.0)
     * @LastEditors: RoyalKnight
     */
    changeContrast(value)

    /**
     * @name: 更改图像亮度
     * @param {Number} value(0.0~1.0)
     * @LastEditors: RoyalKnight
     */
    changeBrightness(value)
    /**
     * @name: 更改图像饱和度
     * @param {Number} value(0.0~1.0)
     * @LastEditors: RoyalKnight
     */
    changeSaturation(value)

    /**
     * @name: 更改图像通道
     * @param {Number} value(0~4)
     * @LastEditors: RoyalKnight
     */
    changeChannel(value)

    /**
     * @name: 更改图像RGBA
     * @param {Number} value(0.0~1.0)
     * @LastEditors: RoyalKnight
     */
    changeGlImgRGBA(rgba)

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
    changeGlImgPos(x = -1, y = -1, w = 1, h = 1, sx = 2, sy = 2)

    /**
     * @name: 获得程序的ImageData
     * @param {*}
     * @return {ImageData}
     * @LastEditors: RoyalKnight
     */
    getImgData()

    /**
     * @name: 将ImageData放入程序
     * @param {ImageData}
     * @return {null}
     * @LastEditors: RoyalKnight
     */
    putImgData(image)
```
