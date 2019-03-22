require('../dist/build.full.js')
import React, { Component } from 'react'
import { Button, Welcome } from '@storybook/react/demo'

const invisible = {visibility: "hidden"}

class ShaderFrameComponent extends Component {
    componentWillMount() {
        this.img = new Image()
        this.img.src = this.props.source
    }
    componentDidMount() {
        this.frame = new ShaderFrame(this.image, ShaderFrame.FX.noiseReveal, this.canvas)
        this.frame.enter()
    }

    render() {
        return (
            <div>
                <img className={this.props.class} style={Object.assign(this.props.style, invisible)} src={this.props.source} ref={(e) => {this.image = e}} />
                <canvas className={this.props.class} style={this.props.style} ref={(e) => {this.canvas = e}} />
            </div>
        )
    }
}

export { ShaderFrameComponent as Frame }
export { Button as Button }
export { Welcome as Welcome }

