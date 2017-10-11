import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  StatusBar,
} from 'react-native';
import StatusBarAlert from 'react-native-statusbar-alert';

export default class App extends React.Component {
  
  state = {
    visible: true,
    barStyle: 'light-content'
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          barStyle="light-content"
        />
        <StatusBarAlert
          visible={this.state.visible}
          message="Alert!"
          pulse="background"
          onPress={() => {
            this.setState({ 
              visible: !this.state.visible,
              barStyle: this.state.barStyle === 'light-content' ? 'dark-content' : 'light-content'
            });
          }}
        />
        <View style={styles.body}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Button
            onPress={() => {
              this.setState({ 
                visible: !this.state.visible,
                barStyle: this.state.barStyle === 'light-content' ? 'dark-content' : 'light-content'
              }, () => {
                StatusBar.setBarStyle(this.state.barStyle)
              });
            }}
            title="Toggle alert"
            color="#3DD84C"
            accessibilityLabel="Toggle alert"
          />
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
