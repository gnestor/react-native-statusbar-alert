import React from 'react';
import {
	Button,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import StatusBarAlert from 'react-native-statusbar-alert';

export class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home View'
	};
	static contextTypes = {
		toggleAlert: PropTypes.func
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.content}>
				<Text style={styles.text}>react-native-statusbar-alert + react-navigation example app</Text>
				<Button
					onPress={() => {
						navigate('Child', {
							time: new Date()
						});
					}}
					title="Push a view"
				/>
				<Button
					onPress={() => {
						this.context.toggleAlert();
					}}
					title="Toggle text alert"
					accessibilityLabel="Toggle text alert"
				/>
			</View>
		);
	}
}

export class ChildScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Child View'
	});
	static contextTypes = {
		toggleAlert: PropTypes.func
	};
	render() {
		const { params } = this.props.navigation.state;
		return (
			<View style={styles.content}>
				<Text style={styles.text}>This time is {params.time.toLocaleTimeString()}</Text>
				<Button
					onPress={() => {
						const image = (
							<Image
								style={{ 
									width: 21,
									height: 18,
									marginBottom: 3
								}}
								source={{
									uri: 'https://facebook.github.io/react-native/img/header_logo.png'
								}}
							/>
						);
						this.context.toggleAlert(image);
					}}
					title="Toggle image alert"
					accessibilityLabel="Toggle image alert"
				/>
			</View>
		);
	}
}

const MyStack = StackNavigator({
	Home: {
		screen: HomeScreen
	},
	Child: {
		screen: ChildScreen
	}
});

export default class App extends React.Component {
	state = {
		alert: false
	};
	getChildContext() {
		return {
			toggleAlert: this.toggleAlert
		};
	}
	static childContextTypes = {
		toggleAlert: PropTypes.func
	};
	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					barStyle={this.state.alert ? 'light-content' : 'dark-content'}
				/>
				<StatusBarAlert
					visible={this.state.alert}
					message="Alert!"
					backgroundColor="#3CC29E"
					color="white"
					style={styles.alert}
					onPress={this.toggleAlert}
				>
					{this.state.customAlert}
				</StatusBarAlert>
				<MyStack />
			</View>
		);
	}
	toggleAlert = (customAlert) => {
		this.setState({
			alert: !this.state.alert,
			customAlert
		});
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	alert: {
		
	},
	content: {
		flex: 1,
		alignItems: 'center',
		padding: 10
	},
	text: {
		padding: 10,
		textAlign: 'center'
	}
});
