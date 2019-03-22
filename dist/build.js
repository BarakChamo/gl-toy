(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Frame = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FX", {
  enumerable: true,
  get: function get() {
    return _presets.default;
  }
});
exports.default = void 0;

var _aBigTriangle = _interopRequireDefault(require("a-big-triangle"));

var _glContext = _interopRequireDefault(require("gl-context"));

var _glShader = _interopRequireDefault(require("gl-shader"));

var _glTexture2d = _interopRequireDefault(require("gl-texture2d"));

var _presets = _interopRequireDefault(require("../presets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vert = "\nattribute vec2 position;\nvarying vec2 texCoord;\n\nvoid main() {\n\tgl_Position = vec4(position, 1, 1);\n\ttexCoord = vec2(0.0,1.0)+vec2(0.5,-0.5) * (position + 1.0);\n}\n".trim();

var noOp = function noOp() {};

var Frame =
/*#__PURE__*/
function () {
  function Frame(tex, _frag) {
    var _this = this;

    var updateHook = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noOp;

    _classCallCheck(this, Frame);

    _defineProperty(this, "tick", function () {
      if (_this.target && _this.position < 1.0 || !_this.target && _this.position > 0.0) window.requestAnimationFrame(_this.tick);

      var frac = (Date.now() - _this.startTime + 0.000001) / _this.duration;

      _this.position = _this.target ? frac : 1.0 - frac;
      _this.position = Math.max(Math.min(_this.position, 1.0), 0.0);

      _this.render();
    });

    _defineProperty(this, "render", function () {
      var width = _this.gl.drawingBufferWidth;
      var height = _this.gl.drawingBufferHeight;

      _this.gl.viewport(0, 0, width, height);

      _this.shader.bind();

      _this.shader.uniforms.uTexture = _this.texture.bind();
      _this.shader.uniforms.uPosition = _this.position;
      _this.shader.uniforms.uScreenSize = [_this.gl.drawingBufferWidth, _this.gl.drawingBufferHeight];
      _this.shader.uniforms.uTime = Date.now() - _this.startTime;

      _this.updateHook(_this.gl, _this.shader);

      (0, _aBigTriangle.default)(_this.gl);
    });

    _defineProperty(this, "onTextureLoaded", function () {
      // this.canvas.style =
      _this.fit();

      if (!_this.textureLoaded) _this.texture = (0, _glTexture2d.default)(_this.gl, _this.texElm);
      _this.textureLoaded = true;
    });

    _defineProperty(this, "setTarget", function (to, duration) {
      _this.duration = duration;
      _this.position = 1.0 - to;
      _this.target = to;
      _this.startTime = Date.now();

      _this.tick();
    });

    _defineProperty(this, "fit", function () {
      _this.canvas.width = _this.texElm.width;
      _this.canvas.height = _this.texElm.height;
      _this.canvas.style.width = null;
      _this.canvas.style.height = null;

      _this.tick();
    });

    _defineProperty(this, "setEffect", function (frag) {
      _this.shader = _this.shader = (0, _glShader.default)(_this.gl, vert, frag);
    });

    this.position = 0.0;
    this.target = 0.0;
    this.duration = 1.0;
    this.startTime = Date.now();
    var canvasElm = document.createElement('canvas');
    canvasElm.style = 'position: absolute; top: 0px; left: 0px;';
    this.canvas = (document.contains(tex) ? tex.parentElement : document.body).appendChild(canvasElm);
    this.gl = (0, _glContext.default)(this.canvas);
    this.shader = (0, _glShader.default)(this.gl, vert, _frag);
    this.updateHook = updateHook; // configure shader

    this.shader.attributes.position.location = 0; // Listen for window resize

    window.addEventListener('resize', this.fit, false); // Create empty initial texture

    this.texture = (0, _glTexture2d.default)(this.gl, [1, 1]); // Load passed texture

    this.loadTexture(tex); // Start animation

    this.tick();
  } // update(frag) {
  // 	shader.update(vert, frag)
  // }

  /*
  ** Render methods
  **/


  _createClass(Frame, [{
    key: "loadTexture",
    value: function loadTexture(tex) {
      this.texElm = tex; // check if image

      if (tex instanceof HTMLImageElement) {
        tex.onload = this.onTextureLoaded;
        if (tex.complete) this.onTextureLoaded();
      } else if (tex instanceof HTMLVideoElement) {
        if (tex.readyState > 3) this.onTextureLoaded();
        tex.canplay = this.onTextureLoaded;
      }
    }
  }, {
    key: "updateExture",
    value: function updateExture() {}
  }, {
    key: "enter",

    /*
    ** API Methods
    **/
    value: function enter() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;
      this.setTarget(1.0, duration * 1.0);
    }
  }, {
    key: "exit",
    value: function exit() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;
      this.setTarget(0.0, duration * 1.0);
    }
  }]);

  return Frame;
}();

var _default = Frame;
exports.default = _default;


},{"../presets":2,"a-big-triangle":undefined,"gl-context":undefined,"gl-shader":undefined,"gl-texture2d":undefined}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var pixelation = "precision mediump float;\n#define GLSLIFY 1\n\n/* Uniforms and inputs */\nvarying vec2 vPos;          // Not sure what this is LOL\nvarying vec2 texCoord;      // Texture UV coordinates\n\nuniform vec2 uScreenSize;   // Screen resolution as a [x,y] vec2\nuniform float uTime;        // Current time\nuniform float uPosition;    // Current entry/exit position, normalized to 0.0-1.0\nuniform sampler2D uTexture; // Texture sampler\n\n/* Helpers */  \nfloat random (vec2 st) {\n  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);\n}\n\n/* Custom params */\nfloat factor = 250.0;\n\n/* Main program */\nvoid main() {\n  float aspect = uScreenSize.y / uScreenSize.x; // Screen aspect ratio\n  vec2 xy = texCoord; \n  xy.y *= aspect; // Normalized screen coordinates\n\n  // Apply timing curve\n  float timing = uPosition * uPosition;\n  float timedFactor = factor * timing;\n\n  // Pixelate the screen by entry time\n  vec2 qxy = floor(xy * float(timedFactor)) / float(timedFactor);\n\n  // Sample original and pixelated sampler\n  vec3 tex = texture2D(uTexture, qxy).rgb;\n  vec3 original = texture2D(uTexture, xy).rgb;\n\n  // Mix effect and original color to end on the full-res image\n  vec3 color = mix(tex, original, timing);\n\n  // Return color\n  gl_FragColor = vec4(color, 1);\n}\n";
var pixelReveal = "precision mediump float;\n#define GLSLIFY 1\n\n/* Uniforms and inputs */\nvarying vec2 vPos;          // Not sure what this is LOL\nvarying vec2 texCoord;      // Texture UV coordinates\n\nuniform vec2 uScreenSize;   // Screen resolution as a [x,y] vec2\nuniform float uTime;        // Current time\nuniform float uPosition;    // Current entry/exit position, normalized to 0.0-1.0\nuniform sampler2D uTexture; // Texture sampler\n\n/* Helpers */  \nfloat random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }\n\nfloat when_gt(float x, float y) { return max(sign(x - y), 0.0); }\n\nfloat quantize(float v, float rate) { return floor(v * rate) / (rate); }\nvec2 quantize(vec2 v, vec2 rate) { return floor(v * rate) / (rate); }\n\n\n/* Custom params */\nfloat tiling = 100.0;\n\n/* Main program */\nvoid main() {\n  float aspect = uScreenSize.y / uScreenSize.x; // Screen aspect ratio\n  vec2 xy = texCoord; \n  xy.y *= aspect; // Normalized screen coordinates\n\n  // Apply timing curve\n  float timing = uPosition * uPosition;\n\n  // Pixelate the screen by entry time\n  vec2 qxy = floor(xy * float(tiling)) / float(tiling);\n  qxy = quantize(qxy, vec2(25));\n\n  float isVisible = when_gt(timing, random(qxy));\n\n  vec3 color = texture2D(uTexture, xy).rgb;\n\n  // Return color\n  gl_FragColor = vec4(color, isVisible);\n}\n";
var noiseReveal = "precision mediump float;\n#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_1_0(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_1_1(vec3 x) {\n  return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_1_2(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_1_0(i); // Avoid truncation effects in permutation\n  vec3 p = permute_1_1( permute_1_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n\n/* Uniforms and inputs */\nvarying vec2 vPos;          // Not sure what this is LOL\nvarying vec2 texCoord;      // Texture UV coordinates\n\nuniform vec2 uScreenSize;   // Screen resolution as a [x,y] vec2\nuniform float uTime;        // Current time\nuniform float uPosition;    // Current entry/exit position, normalized to 0.0-1.0\nuniform sampler2D uTexture; // Texture sampler\n\n/* Helpers */  \nfloat random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }\n\nfloat when_gt(float x, float y) { return max(sign(x - y), 0.0); }\n\nfloat quantize(float v, float rate) { return floor(v * rate) / (rate); }\nvec2 quantize(vec2 v, vec2 rate) { return floor(v * rate) / (rate); }\n\n\n/* Custom params */\nfloat tiling = 100.0;\n\n/* Main program */\nvoid main() {\n  float aspect = uScreenSize.y / uScreenSize.x; // Screen aspect ratio\n  vec2 xy = texCoord; \n  xy.y *= aspect; // Normalized screen coordinates\n\n  // Apply timing curve\n  float timing = uPosition * uPosition;\n\n  // Pixelate the screen by entry time\n  vec2 qxy = floor(xy * float(tiling)) / float(tiling);\n  qxy = quantize(qxy, vec2(500.0));\n\n  float noise = (snoise_1_2(qxy * 10.0) + 1.0) / 2.0;\n  \n  float isVisible = when_gt(timing, noise);\n\n  vec3 color = texture2D(uTexture, xy).rgb;\n  gl_FragColor = vec4(color, isVisible);\n\n\n  // Return color\n  // gl_FragColor = vec4(color, isVisible);\n}\n";
var shaders = {
  pixelation: pixelation,
  pixelReveal: pixelReveal,
  noiseReveal: noiseReveal
};
var _default = shaders;
exports.default = _default;


},{}]},{},[1])(1)
});
