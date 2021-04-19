/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-18 22:43:37
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-18 22:45:27
 */
let farg =`
#ifdef GL_ES
precision mediump float;
#endif
uniform vec4 u_RGB_color;

uniform float u_brightness;//亮度
uniform float u_contrast;//对比度
uniform float u_saturation;//饱和度

uniform int u_channel;//通道

uniform sampler2D u_Sampler;

varying vec2 v_TexCoord;

void main() {

  vec4 total=vec4(0.0,0.0,0.0,1.0);
  total=texture2D(u_Sampler, v_TexCoord)+u_RGB_color;
  float color_a = total.a;
  //u_brightness
  total= total * u_brightness / 1.0;
  //u_contrast
  total= total + (total - 0.5) * (u_contrast - 1.0);
  //u_saturation
  float maxC = max(max(total.r,total.g),total.b);
  total =total +((maxC - total) * (1.0 - u_saturation)) / 1.0;

  total.a =color_a;
  // if(u_channel==0){
  //   gl_FragColor = total;
  // }else if(u_channel == 1){
  //   gl_FragColor = vec4(total.r,total.r,total.r,total.a);
  // }else if(u_channel == 2){
  //   gl_FragColor = vec4(total.g,total.g,total.g,total.a);
  // }else if(u_channel == 3){
  //   gl_FragColor = vec4(total.b,total.b,total.b,total.a);
  // }else if(u_channel == 4){
  //   gl_FragColor = vec4(total.a,total.a,total.a,total.a);
  // }

  if(u_channel==0){
    gl_FragColor = total;
  }else if(u_channel == 1){
    gl_FragColor = vec4(total.r,0,0,total.a);
  }else if(u_channel == 2){
    gl_FragColor = vec4(0,total.g,0,total.a);
  }else if(u_channel == 3){
    gl_FragColor = vec4(0,0,total.b,total.a);
  }else if(u_channel == 4){
    gl_FragColor = vec4(0,0,0,total.a);
  }
}
`
let poin =`
attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  void main() {
    gl_Position = a_Position;
    v_TexCoord = a_TexCoord;
  }
`
export {
    farg,
    poin
}