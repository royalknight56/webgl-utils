/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2020-11-28 10:07:43
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-19 14:40:01
 */

import {
    downloadImage,
    changeImageSize
} from './jsUtil/file/file_utils.js'

import { Program } from './jsUtil/program.js'

main()
async function main() {

    let pro = new Program('webgl')

    let datapro = new Program('datagl')


    let image2 = await downloadImage('./resources/sky.JPG');
    let image3 = await downloadImage('./resources/brid.jpg');


    let finimage = await changeImageSize(image3, 256 * 256, 256 * 256)

    pro.initProgramImg(finimage)
    datapro.initProgramImg(finimage)

    pro.draw()
    datapro.draw()

    document.getElementById('webgl').addEventListener('mousemove', async(e) => {
        let posoffx = -1 + e.offsetX / 124
        let posoffy = -1 - e.offsetY / 124
        pro.changeGlImgPos(posoffx, posoffy)
        pro.draw()


        let imgda1 = pro.getImgData()
        let imgda2 = datapro.getImgData()
        var d2ctx = document.getElementById('showgl').getContext('2d');
        
        let i1=await createImageBitmap(imgda1)
        let i2=await createImageBitmap(imgda2)
        d2ctx.drawImage(i2,0,0)
        d2ctx.drawImage(i1,0,0)
    })

    document.addEventListener('click', (e) => {
        let imgda = pro.getImgData()
        datapro.putImgData(imgda)
        datapro.draw()
    })
    document.addEventListener("keydown", async (e) => {
        let imgda1 = pro.getImgData()
        let imgda2 = datapro.getImgData()
        var d2ctx = document.getElementById('showgl').getContext('2d');
        
        let i1=await createImageBitmap(imgda1)
        let i2=await createImageBitmap(imgda2)
        d2ctx.drawImage(i1,0,0)
        d2ctx.drawImage(i2,0,0)
    })



    let sw = true
    setInterval(() => {

        if (sw) {
            pro.changeProgramImg(image2)
        } else {
            pro.changeProgramImg(finimage)
        }

        sw = !sw
        pro.draw()

    }, 1000)

}



