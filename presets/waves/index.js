var glslify = require('glslify')
import toy from '../../lib/toy'

var start  = Date.now()
var shader = glslify('./waves.frag', {
  transform: ['glslify-hex']
})

toy(shader, function(gl, sh) {
  sh.uniforms.uScreenSize = [gl.drawingBufferWidth, gl.drawingBufferHeight]
  sh.uniforms.uTime = (Date.now() - start) / 1000
})
