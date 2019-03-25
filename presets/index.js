import pixelation from './pixelation.frag'
import pixelReveal from './pixel-reveal.frag'
import noiseReveal from './noise-reveal.frag'
import wipe from './wipe.frag'

const shaders = {
	pixelation: [pixelation, {}],
	pixelReveal: [pixelReveal, {}],
	noiseReveal: [noiseReveal, {}],
	wipe: [wipe, { tiling: 10.0 }]
}

export default shaders