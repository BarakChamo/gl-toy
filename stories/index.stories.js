import React, { Component } from 'react'

import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import Frame from '../dist/component.js'

console.log(Frame)

class FrameExample extends Component {
  constructor(props) {
    super(props)
    this.state = { enter: true }
  }

  render() {
    return (
      <div style={containerStyle}>
        {/* <Frame state={this.state.enter} {...this.props} /> */}
        <Button onClick={() => this.setState({enter: true})}>Enter</Button>
        <Button onClick={() => this.setState({enter: false})}>Exit</Button>

      </div>
    )
  }
}

const containerStyle = {width: '250px', height: '300', position: 'relative'}
const style = {width: '100%', height: '100%'}

storiesOf('Shader Frame', module)
  .add('Basic example - noise', () => (
    <FrameExample style={containerStyle} imgstyle={style} class={'full'} source='cat.jpg'/>
  ))
  
  .add('Timing control', () => (
    <div>
      <FrameExample style={containerStyle} fx='wipe' duration={1000} imgstyle={style} class={'full'} source='cat.jpg'/>
      <FrameExample style={containerStyle} fx='wipe' duration={2000} imgstyle={style} class={'full'} source='cat.jpg'/>
      <FrameExample style={containerStyle} fx='wipe' duration={3000} imgstyle={style} class={'full'} source='cat.jpg'/>
    </div>
  ))

  .add('Shader uniforms', () => (
    <div>
      <FrameExample style={containerStyle} fx='wipe' params={{tiling: 10}} imgstyle={style} class={'full'} source='cat.jpg'/>
      <FrameExample style={containerStyle} fx='wipe' params={{tiling: 25}} imgstyle={style} class={'full'} source='cat.jpg'/>
      <FrameExample style={containerStyle} fx='wipe' params={{tiling: 50}} imgstyle={style} class={'full'} source='cat.jpg'/>
    </div>
  ))