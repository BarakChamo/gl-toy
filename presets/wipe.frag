precision highp float;
#pragma glslify: ease = require(glsl-easings/cubic-out)

/* Uniforms and inputs */
varying vec2 vPos;          // Not sure what this is LOL
varying vec2 texCoord;      // Texture UV coordinates

// global params
uniform vec2 uScreenSize;   // Screen resolution as a [x,y] vec2
uniform float uTime;        // Current time
uniform float uPosition;    // Current entry/exit position, normalized to 0.0-1.0
uniform sampler2D uTexture; // Texture sampler
uniform sampler2D uBackgroundTexture; //background texture sampler

// shader params
uniform float tiling;

/* Helpers */  
float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
float when_gt(float x, float y) { return max(sign(x - y), 0.0); }
float quantize(float v, float rate) { return floor(v * rate) / (rate); }
vec2 quantize(vec2 v, vec2 rate) { return floor(v * rate) / (rate); }

/* Main program */
void main() {
  float aspect = uScreenSize.y / uScreenSize.x; // Screen aspect ratio
  vec2 xy = texCoord; 
  xy.y *= aspect; // Normalized screen coordinates

  // Pixelate the screen by entry time
  vec2 qxy = floor(xy.y * vec2(tiling));
  vec2 mxy = mod(qxy, vec2(2.0));
  // float delay = random(vec2(xy.x));
  // float delay = random(vec2(xy.y));
  float delay = random(vec2(qxy.y));
  float dir = abs(mxy.y - xy.x);

  float position = uPosition * 2.0 - 1.0;

  float isVisible = when_gt(ease(position + delay), dir);

  vec4 front = texture2D(uTexture, xy);
  vec4 back = texture2D(uBackgroundTexture, xy);

  vec4 color = mix(back, front, isVisible);
  gl_FragColor = color;
}
