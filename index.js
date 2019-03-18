import Frame, { FX } from './lib/frame'

/*
**  Fragment.js shader frame examples
*/

/* Example 1 */ 
// Select image by id in document
const image1 = document.getElementById('example1')

// Convert image to a shaderFrame
const frame1 = new Frame(image1, FX.noiseReveal)

// Handle enter, exit and effect changes
document.getElementById('enter1').onclick = () => frame1.enter()
document.getElementById('exit1').onclick = () => frame1.exit()
document.getElementById('select1').onchange = e => {frame1.setEffect(FX[e.target.value])}

setTimeout(() => frame1.enter(), 0)
