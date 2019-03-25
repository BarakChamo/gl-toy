import React, { Component } from 'react'

import { storiesOf } from '@storybook/react'
import { Button, Welcome } from '@storybook/react/demo';
import Frame from '../lib/component.js'

class FrameExample extends Component {
  constructor(props) {
    super(props)
    this.state = { enter: true }
  }

  render() {
    return (
      <div>
        <Frame state={this.state.enter} {...this.props} />
        <Button onClick={() => this.setState({enter: true})}>Enter</Button>
        <Button onClick={() => this.setState({enter: false})}>Exit</Button>
      </div>
    )
  }
}

const containerStyle = {width: '250px', height: '250px'}
const style = {width: '100%', height: '100%'}

storiesOf('Shader Frame', module)
  .add('with image URL', () => (
    <FrameExample style={containerStyle} imgstyle={style} class={'full'} source='cat.jpg'/>
  ))