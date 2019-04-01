precision mediump float;

/* Uniforms and inputs */
varying vec2 vPos;          // Not sure what this is LOL
varying vec2 texCoord;      // Texture UV coordinates

uniform vec2 uScreenSize;   // Screen resolution as a [x,y] vec2
uniform float uTime;        // Current time
uniform float uPosition;    // Current entry/exit position, normalized to 0.0-1.0
uniform sampler2D uTexture; // Texture sampler
uniform sampler2D uBackgroundTexture; //background texture sampler

/* Helpers */  
float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }

float when_gt(float x, float y) { return max(sign(x - y), 0.0); }

float quantize(float v, float rate) { return floor(v * rate) / (rate); }
vec2 quantize(vec2 v, vec2 rate) { return floor(v * rate) / (rate); }


/* Custom params */
float tiling = 100.0;

/* Main program */
void main() {
  float aspect = uScreenSize.y / uScreenSize.x; // Screen aspect ratio
  vec2 xy = texCoord; 
  xy.y *= aspect; // Normalized screen coordinates

  // Apply timing curve
  float timing = uPosition * uPosition;

  // Pixelate the screen by entry time
  vec2 qxy = floor(xy * float(tiling)) / float(tiling);
  qxy = quantize(qxy, vec2(25));

  float isVisible = when_gt(timing, random(qxy));

  vec4 front = texture2D(uTexture, xy);
  vec4 back = texture2D(uBackgroundTexture, xy);

  vec4 color = mix(back, front, isVisible);
  gl_FragColor = color;
}
