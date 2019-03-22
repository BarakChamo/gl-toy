const Frames = require('../dist/build.full.js')

import React, { Component } from 'react'
import PropTypes from 'prop-types'

const invisible = {visibility: "hidden"}

class ShaderFrameComponent extends Component {
    static propTypes = {
        style: PropTypes.object,
        imgstyle: PropTypes.object,
        className: PropTypes.string,
        source: PropTypes.string,
        state: PropTypes.bool,
        fx: PropTypes.oneOf(['News', 'Photos'])
    }

    componentDidMount() {
        this.frame = new ShaderFrame(this.image, ShaderFrame.FX.noiseReveal, this.canvas)
        this.frame.enter()
    }

    render() {
        return (
            <div className={this.props.class} style={this.props.style}>
                <img style={Object.assign(this.props.imgstyle || {}, invisible)} src={this.props.source} ref={(e) => {this.image = e}} />
                <canvas style={this.props.imgstyle} ref={(e) => {this.canvas = e}} />
            </div>
        )
    }
}

export default ShaderFrameComponent
