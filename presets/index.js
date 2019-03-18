var glslify = require('glslify')

const pixelation = glslify('./pixelation.frag', { transform: ['glslify-hex'] })
const pixelReveal = glslify('./pixel-reveal.frag', { transform: ['glslify-hex'] })
const noiseReveal = glslify('./noise-reveal.frag', { transform: ['glslify-hex'] })

const shaders = {
    pixelation,
    pixelReveal,
    noiseReveal
}

export default shaders