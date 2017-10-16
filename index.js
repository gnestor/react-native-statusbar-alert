import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Animated,
	InteractionManager,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View
} from 'react-native';

class StatusBarAlert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: new Animated.Value(0),
			opacity: new Animated.Value(0),
			pulse: new Animated.Value(0)
		};
		this.timer = null;
	}

	componentDidMount() {
		if (this.props.visible === true) {
			// Slide animation
			requestAnimationFrame(() => {
				Animated.parallel([
					Animated.timing(this.state.height, {
						toValue:
							Platform.OS === 'ios'
								? this.props.height +
									(this.props.statusbarHeight || STATUS_BAR_HEIGHT)
								: this.props.height,
						duration: SLIDE_DURATION
					}),
					Animated.timing(this.state.opacity, {
						toValue: 1,
						duration: SLIDE_DURATION
					})
				]).start();
			});
		}
		// Pulse animation
		this.timer = setInterval(() => {
			if (this.props.pulse) {
				if (Math.round(this.state.pulse._value) === 1) {
					Animated.timing(this.state.pulse, {
						toValue: 0,
						duration: PULSE_DURATION
					}).start();
				} else {
					Animated.timing(this.state.pulse, {
						toValue: 1,
						duration: PULSE_DURATION
					}).start();
				}
			}
		}, PULSE_DURATION);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible !== this.props.visible) {
			if (nextProps.visible === true) {
				// Show alert
				requestAnimationFrame(() => {
					Animated.parallel([
						Animated.timing(this.state.height, {
							toValue:
								Platform.OS === 'ios'
									? nextProps.height +
										(this.props.statusbarHeight || STATUS_BAR_HEIGHT)
									: nextProps.height,
							duration: SLIDE_DURATION
						}),
						Animated.timing(this.state.opacity, {
							toValue: 1,
							duration: SLIDE_DURATION
						})
					]).start();
				});
			}
			if (nextProps.visible === false) {
				// Hide alert
				requestAnimationFrame(() => {
					Animated.parallel([
						Animated.timing(this.state.height, {
							toValue: 0,
							duration: SLIDE_DURATION
						}),
						Animated.timing(this.state.opacity, {
							toValue: 0,
							duration: SLIDE_DURATION
						})
					]).start();
				});
			}
		}
	}

	render() {
		const content = this.props.children || (
			<Animated.Text
				style={[
					styles.text,
					{
						color: this.props.color || styles.text.color,
						opacity: this.props.pulse === 'text' ? this.state.pulse : 1
					}
				]}
				allowFontScaling={false}
			>
				{this.props.message}
			</Animated.Text>
		);
		return (
			<Animated.View
				style={[
					styles.view,
					this.props.style,
					{
						height: this.state.height,
						opacity: this.state.opacity,
						backgroundColor:
							this.props.pulse === 'background'
								? this.state.pulse.interpolate({
										inputRange: [0, 1],
										outputRange: [
											this.props.backgroundColor,
											this.props.highlightColor ||
												saturate(this.props.backgroundColor, SATURATION)
										]
									})
								: this.props.backgroundColor
					}
				]}
			>
				<TouchableOpacity
					style={[styles.touchableOpacity, this.props.style]}
					onPress={this.props.onPress || null}
					activeOpacity={ACTIVE_OPACITY}
				>
					{content}
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const PULSE_DURATION = 1000;
const SLIDE_DURATION = 300;
const ACTIVE_OPACITY = 0.6;
const DEFAULT_BACKGROUND_COLOR = '#3DD84C';
const SATURATION = 0.9;

const styles = {
	view: {
		height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT * 2 : STATUS_BAR_HEIGHT,
		backgroundColor: saturate('#3DD84C', SATURATION)
	},
	touchableOpacity: {
		flex: 1,
		display: 'flex',
		height: STATUS_BAR_HEIGHT,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	text: {
		height: STATUS_BAR_HEIGHT,
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 20,
		marginBottom: Platform.OS === 'ios' ? 4 : 0,
		color: 'white'
	}
};

StatusBarAlert.propTypes = {
	visible: PropTypes.bool.isRequired,
	message: PropTypes.string,
	pulse: PropTypes.oneOf(['text', 'background', null, false]),
	backgroundColor: PropTypes.string,
	highlightColor: PropTypes.string,
	color: PropTypes.string,
	height: PropTypes.number,
	statusbarHeight: PropTypes.number,
	onPress: PropTypes.func,
	style: PropTypes.any
};

StatusBarAlert.defaultProps = {
	visible: false,
	message: '',
	pulse: false,
	backgroundColor: DEFAULT_BACKGROUND_COLOR,
	highlightColor: null,
	color: styles.text.color,
	height: STATUS_BAR_HEIGHT,
	statusbarHeight: STATUS_BAR_HEIGHT,
	onPress: null
};

function saturate(color, percent) {
	let R = parseInt(color.substring(1, 3), 16);
	let G = parseInt(color.substring(3, 5), 16);
	let B = parseInt(color.substring(5, 7), 16);
	R = parseInt(R * percent);
	G = parseInt(G * percent);
	B = parseInt(B * percent);
	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;
	let r = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
	let g = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
	let b = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);
	return `#${r + g + b}`;
}

export default StatusBarAlert;
