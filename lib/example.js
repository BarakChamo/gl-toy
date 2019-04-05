/*
**  Fragment.js shader frame examples
*/

/* Example 1 */ 
// Select image by id in document
const image1 = document.getElementById('example1')

// Convert image to a shaderFrame
const frame1 = new ShaderFrame({ tex: image1, fx: ShaderFrame.FX.noiseReveal, clear: true })

// Handle enter, exit and effect changes
document.getElementById('enter1').onclick = () => frame1.enter()
document.getElementById('exit1').onclick = () => frame1.exit()
document.getElementById('select1').onchange = e => {frame1.setEffect(ShaderFrame.FX[e.target.value])}

setTimeout(() => frame1.enter(), 0)

/* Example 2 */ 

const canvas2 = document.getElementById('example2')

// Select image by id in document
const image2 = new Image()
image2.src = 'assets/cat.jpg'

const background2 = new Image()
background2.src = 'assets/back.jpg'

// Convert image to a shaderFrame
const frame2 = new ShaderFrame({ tex: image2, background: background2, fx: ShaderFrame.FX.noiseReveal, canvas: canvas2 })

// Handle enter, exit and effect changes
document.getElementById('enter2').onclick = () => frame2.enter()
document.getElementById('exit2').onclick = () => frame2.exit()
document.getElementById('select2').onchange = e => {frame2.setEffect(ShaderFrame.FX[e.target.value])}

setTimeout(() => frame2.enter(), 0)
