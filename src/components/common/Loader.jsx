import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

import './Loader.css';

const rotateKeyframes = {
	'100%': {
		transform: 'rotate(360deg)'
	}
};

const bounceKeyframes = {
	'0%, 100%': {
		transform: 'scale(0)'
	},
	'50%': {
		transform: 'scale(1.0)'
	}
};

const rotateAnimationName = insertKeyframesRule(rotateKeyframes);

const bounceAnimationName = insertKeyframesRule(bounceKeyframes);

class Loader extends Component {
	getBallStyle(size) {
		return {
			backgroundColor: this.props.color,
			width: size,
			height: size,
			borderRadius: '100%',
			verticalAlign: this.props.verticalAlign
		};
	}

	getAnimationStyle(i) {
		const animation = [
			i === 0 ? rotateAnimationName : bounceAnimationName,
			'2s',
			i === 2 ? '-1s' : '0s',
			'infinite',
			'linear'
		].join(' ');
		const animationFillMode = 'forwards';

		return {
			animation: animation,
			animationFillMode: animationFillMode
		};
	}

	getStyle(i) {
		const size = this.props.size;
		const ballSize = size / 2;

		if (i) {
			return assign(this.getBallStyle(ballSize), this.getAnimationStyle(i), {
				position: 'absolute',
				top: i % 2 ? 0 : 'auto',
				bottom: i % 2 ? 'auto' : 0
			});
		}

		return assign(this.getAnimationStyle(i), {
			width: size,
			height: size,
			position: 'relative'
		});
	}

	renderLoader(loading) {
		if (loading) {
			return (
				<div id={this.props.id} className="loading">
					<div style={this.getStyle(0)}>
						<div style={this.getStyle(1)} />
						<div style={this.getStyle(2)} />
					</div>
				</div>
			);
		}

		return null;
	}

	render() {
		return this.renderLoader(this.props.loading);
	}
}

Loader.propTypes = {
	loading: PropTypes.bool,
	color: PropTypes.string,
	size: PropTypes.number,
	margin: PropTypes.string
};

export default Loader;
