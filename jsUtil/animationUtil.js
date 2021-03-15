/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-02-03 19:32:47
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-02-03 19:34:23
 */
export {
    perFrame
}
function perFrame(fun){
    let perFrameFun = function(){
        fun()
        requestAnimationFrame(perFrameFun)
    } 
    window.requestAnimationFrame(perFrameFun)
}
function addCanvasEventListener(id){

}