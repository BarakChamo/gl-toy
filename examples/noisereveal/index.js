var glslify = require('glslify')
import toy from '../../lib/toy'
import Frame from '../../lib/frame'

var start  = Date.now()
var shader = glslify('./frame.frag', {
  transform: ['glslify-hex']
})

const image = new Image(200,200)
image.src = '/examples/pixelation/cat.jpg'
const frame = new Frame(image, shader, (gl, sh) => {
  // sh.uniforms.uScreenSize = [gl.drawingBufferWidth, gl.drawingBufferHeight]
  // sh.uniforms.uTime = (Date.now() - start) / 1000
})

window.frame = frame