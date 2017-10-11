import React from 'react';
import { StyleSheet, View, Text, Button, Image, StatusBar } from 'react-native';
import StatusBarAlert from 'react-native-statusbar-alert';

export default class App extends React.Component {
	state = {
		visible: false,
		barStyle: 'dark-content',
		content: null
	};

	render() {
		StatusBar.setBarStyle(this.state.barStyle);
		return (
			<View style={styles.container}>
				<StatusBar barStyle={this.state.barStyle} />
				{this.state.content}
				<View style={styles.body}>
					<Text>Welcome to the react-native-statusbar-alert example app</Text>
					<Button
						onPress={() => {
							this.setState({
								visible: !this.state.visible,
								barStyle:
									this.state.barStyle === 'light-content'
										? 'dark-content'
										: 'light-content',
								content: this.imageAlert()
							});
						}}
						title="Toggle image alert"
						color="#3DD84C"
						accessibilityLabel="Toggle image alert"
					/>
					<Button
						onPress={() => {
							this.setState({
								visible: !this.state.visible,
								barStyle:
									this.state.barStyle === 'light-content'
										? 'dark-content'
										: 'light-content',
								content: this.textAlert()
							});
						}}
						title="Toggle text alert"
						color="#3DD84C"
						accessibilityLabel="Toggle text alert"
					/>
				</View>
			</View>
		);
	}

	textAlert = () => (
		<StatusBarAlert
			visible={!this.state.visible}
			message="Alert!"
			pulse="background"
			onPress={() => {
				this.setState({
					visible: !this.state.visible,
					barStyle:
						this.state.barStyle === 'light-content'
							? 'dark-content'
							: 'light-content'
				});
			}}
		/>
	);

	imageAlert = () => (
		<StatusBarAlert
			visible={!this.state.visible}
			pulse="background"
			height={68}
			style={{
				padding: 5
			}}
		>
			<Image
				style={{ width: 66, height: 58 }}
				source={{
					uri: 'https://facebook.github.io/react-native/img/header_logo.png'
				}}
				onPress={() => {
					this.setState({
						visible: !this.state.visible,
						barStyle:
							this.state.barStyle === 'light-content'
								? 'dark-content'
								: 'light-content'
					});
				}}
			/>
		</StatusBarAlert>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	body: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
