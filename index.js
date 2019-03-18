import presets from './presets'
import Frame from './lib/frame'
console.log('PRESETS', presets)

/*
**  Fragment.js shader frame examples
*/

/* Example 1 */ 
// Create first example frames
const image1 = document.getElementById('example1')
const frame1 = new Frame(image1, presets.noiseReveal)

// Handle enter and exit clicks
document.getElementById('enter1').onclick = () => frame1.enter()
document.getElementById('exit1').onclick = () => frame1.exit()
document.getElementById('select1').onchange = e => {frame1.setEffect(presets[e.target.value])}

setTimeout(() => frame1.enter(), 0)
