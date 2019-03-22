import triangle from 'a-big-triangle'
import context from 'gl-context'
import Shader from 'gl-shader'
import createTexture from 'gl-texture2d'

import presets from '../presets'

const vert = `
attribute vec2 position;
varying vec2 texCoord;

void main() {
	gl_Position = vec4(position, 1, 1);
	texCoord = vec2(0.0,1.0)+vec2(0.5,-0.5) * (position + 1.0);
}
`.trim()

const noOp = () => {}

class ShaderFrame {
	constructor(tex, frag, updateHook = noOp) {
		this.position = 0.0;
		this.target = 0.0;
		this.duration = 1.0;
		this.startTime = Date.now()
		
		const canvasElm = document.createElement('canvas')
		canvasElm.style = 'position: absolute; top: 0px; left: 0px;'
		this.canvas = (document.contains(tex)? tex.parentElement : document.body).appendChild(canvasElm)

		this.gl     = context(this.canvas)
		this.shader = Shader(this.gl, vert, frag)
		this.updateHook = updateHook

		// configure shader
		this.shader.attributes.position.location = 0

		// Listen for window resize
		window.addEventListener('resize', this.fit, false)

		// Create empty initial texture
		this.texture = createTexture(this.gl, [1,1])

		// Load passed texture
		this.loadTexture(tex)

		// Start animation
		this.tick()
	}

	// update(frag) {
	// 	shader.update(vert, frag)
	// }

	/*
	** Render methods
	**/ 

	tick = () => {
		if ((this.target && this.position < 1.0) || (!this.target && this.position > 0.0))
			window.requestAnimationFrame(this.tick)

		const frac = (Date.now() - this.startTime + 0.000001) / this.duration

		this.position = this.target ? frac : 1.0 - frac
		this.position = Math.max(Math.min(this.position, 1.0), 0.0)
		
		this.render()
	}

	render = () => {
    const width  = this.gl.drawingBufferWidth
    const height = this.gl.drawingBufferHeight
    this.gl.viewport(0, 0, width, height)

		this.shader.bind()
		this.shader.uniforms.uTexture = this.texture.bind()
		this.shader.uniforms.uPosition = this.position
		this.shader.uniforms.uScreenSize = [this.gl.drawingBufferWidth, this.gl.drawingBufferHeight]
		this.shader.uniforms.uTime = Date.now() - this.startTime

    this.updateHook(this.gl, this.shader)
    triangle(this.gl)
	}

	loadTexture(tex) {
		this.texElm = tex
		
		// check if image
		if(tex instanceof HTMLImageElement) {
			tex.onload = this.onTextureLoaded
			if(tex.complete) this.onTextureLoaded()
		} else if (tex instanceof HTMLVideoElement) {
			if(tex.readyState > 3) this.onTextureLoaded()
			tex.canplay = this.onTextureLoaded
		}
	}

	onTextureLoaded = () => {
		// this.canvas.style =
		this.fit()

		if(!this.textureLoaded)
			this.texture = createTexture(this.gl, this.texElm)

		this.textureLoaded = true
	}

	updateExture() {

	}

	setTarget = (to, duration) => {
		this.duration = duration
		this.position = 1.0 - to;
		this.target = to
		this.startTime = Date.now()

		this.tick()
	}

	fit = () => {
		this.canvas.width = this.texElm.width
		this.canvas.height = this.texElm.height
		this.canvas.style.width = null
		this.canvas.style.height = null
		this.tick()
	}

	/*
	** API Methods
	**/ 
	enter(duration = 2000) {
		this.setTarget(1.0, duration * 1.0)
	}

	exit(duration = 2000) {
		this.setTarget(0.0, duration * 1.0)
	}

	setEffect = (frag) => {
		this.shader = this.shader = Shader(this.gl, vert, frag)
	}
}

ShaderFrame.FX = presets
module.exports = ShaderFrame
// export default ShaderFrame
export { presets as FX }