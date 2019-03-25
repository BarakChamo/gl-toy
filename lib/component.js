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
		fx: PropTypes.oneOf(Object.keys(ShaderFrame.FX)),
		duration: PropTypes.number,
	}

	static defaultProps = {
		fx: 'wipe',
		state: true,
		duration: 1000,
	}

	componentDidMount() {
		this.frame = new ShaderFrame(this.refs.image, ShaderFrame.FX[this.props.fx], this.refs.canvas)

		if(this.props.state)
			this.frame.enter(this.props.duration)
	}

	componentDidUpdate({ state }) {
		if(this.props.state !== state)
			this.props.state ? this.frame.enter(this.props.duration) : this.frame.exit(this.props.duration)
	}

	render() {
		return (
			<div className={this.props.class} style={{position: 'relative', ...this.props.style}}>
				<img style={{...this.props.imgstyle, ...invisible}} src={this.props.source} ref='image' />
				<canvas style={this.props.imgstyle} ref='canvas' />
			</div>
		)
	}
}

export default ShaderFrameComponent
