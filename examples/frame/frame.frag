precision mediump float;

varying vec2 vPos;          // Not sure what this is LOL
varying vec2 texCoord;      // Texture UV coordinates

uniform vec2 uScreenSize;   // Screen resolution as a [x,y] vec2
uniform float uTime;        // Current time
uniform float uPosition;    // Current entry/exit position, normalized to 0.0-1.0
uniform sampler2D uTexture; // Texture sampler

// Custom parameters here
float factor = 250.0;

void main() {
  float aspect = uScreenSize.y / uScreenSize.x; // Screen aspect ratio
  vec2 xy = texCoord * aspect;                  // Normalized screen coordinates

  // Apply timing curve
  float timing = uPosition * uPosition;
  float timedFactor = factor * timing;

  // Pixelate the screen by entry time
  vec2 qxy = floor(xy * float(timedFactor)) / float(timedFactor);

  // Sample original and pixelated sampler
  vec3 tex = texture2D(uTexture, qxy).rgb;
  vec3 original = texture2D(uTexture, xy).rgb;

  // Mix effect and original color to end on the full-res image
  vec3 color = mix(tex, original, timing);

  // Return color
  gl_FragColor = vec4(color, 1);
}
