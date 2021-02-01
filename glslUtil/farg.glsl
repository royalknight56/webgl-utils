#ifdef GL_ES
precision mediump float;
#endif
uniform vec4 u_RGB_color;

uniform float u_brightness;//亮度
uniform float u_contrast;//对比度
uniform float u_saturation;//饱和度

uniform vec2 u_chose_pos;

uniform sampler2D u_Sampler;

varying vec2 v_TexCoord;

void main() {

  vec4 total=vec4(0.0,0.0,0.0,1.0);
  vec4 u_chose_color = texture2D(u_Sampler, u_chose_pos);

  vec4 color_distance=texture2D(u_Sampler, v_TexCoord)-u_chose_color;
  // if(length(color_distance)<0.1){
  //   vec4 before = texture2D(u_Sampler, v_TexCoord);
  //   total=before/2.0+vec4(0.0,0.0,1.0,0);
  //   total.a=1.0;
    
  // }else{
    total=texture2D(u_Sampler, v_TexCoord)+u_RGB_color;
  // }
  

  // }

  //u_brightness
  total=total * u_brightness / 1.0;
  //u_contrast
  total= total + (total - 0.5) * (u_contrast - 1.0);
  //u_saturation
  float maxC = max(max(total.r,total.g),total.b);
  total =total +((maxC - total) * (1.0 - u_saturation)) / 1.0;

  // gl_FragData[0]=vec4(0.0,0.0,0,0);
  gl_FragColor = total;


}