require('../dist/index.js')

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
		this.frame = new ShaderFrame(this.refs.image, ShaderFrame.FX.noiseReveal, this.refs.canvas)

		if(this.props.state)
			this.frame.enter()
	}

	componentDidUpdate({ state }) {
		if(this.props.state !== state)
			this.props.state ? this.frame.enter() : this.frame.exit()
	}

	render() {
		return (
			<div className={this.props.class} style={this.props.style}>
				<img style={Object.assign({}, this.props.imgstyle || {}, invisible)} src={this.props.source} ref='image' />
				<canvas style={this.props.imgstyle} ref='canvas' />
			</div>
		)
	}
}

export default ShaderFrameComponent
