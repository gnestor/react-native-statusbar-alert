# React Native Statusbar Alert

A status bar alert (e.g. in-call, recording, navigating) for React Native

## Install

`npm install react-native-statusbar-alert --save`

## Usage

### Basic

```js
<StatusBarAlert
  visible={true}
  message="Silent Switch ON"
  backgroundColor="#3CC29E"
  color="white"
/>
```

![basic](screenshots/react-native-statusbar-alert.mov.gif)

### Pulse

```js
<StatusBarAlert
  visible={true}
  message="Silent Switch ON"
  backgroundColor="#3CC29E"
  color="white"
  pulse="background"
/>
```

![pulse](screenshots/react-native-statusbar-alert-pulse.mov.gif)

### Press

```js
<StatusBarAlert
  visible={true}
  message="Silent Switch ON"
  backgroundColor="#3CC29E"
  color="white"
  onPress={() => this.navigator.push({id: 'SilentAlert'})}
/>
```

![press](screenshots/react-native-statusbar-alert-press.mov.gif)

## Props

| Name            | Description                     | Required    | Type                      | Default
| :-------------  | :------------------------------ | :---------- | :------------------------ | :------
| visible         | `true` to show, `false` to hide | true        | bool                      | `false`
| message         | message to display in alert     | true        | string                    | `''`
| onPress         | callback on press event         | false       | func                      | `null`
| pulse           | animate the text or background  | false       | enum('text','background') | `false`
| backgroundColor | background color                | false       | [color][1]                | `'#3DD84C'`
| highlightColor  | color on press and pulse        | false       | [color][1]                | `darken(this.props.backgroundColor, 0.9)`
| color           | text color                      | false       | [color][1]                | `'white'`
| statusbarHeight | [custom status bar height][2]   | false       | int                       | 20

[1]: https://facebook.github.io/react-native/docs/colors.html  "Colors"
[2]: https://github.com/brentvatne/react-native-status-bar-size "react-native-status-bar-size"

## Usage with Navigator on iOS

Navigator automatically offsets its navigation bar's top position by the height of the status bar ([source](https://github.com/facebook/react-native/blob/ca2fb70fa9affc6ad9acae6bf116c084cdaa0da3/Libraries/CustomComponents/Navigator/NavigatorNavigationBarStylesIOS.js#L42)). StatusBarAlert is positioned adjacent to the Navigator component and offsets the entire Navigator component by the height of the status bar. To correct the navigation bar's top position, simply add `top: -20` to the navigation bar's style.

```js
<Navigator
  initialRoute={initialRoute}
  renderScene={this.renderScene}
  navigationBar={
    <Navigator.NavigationBar
      routeMapper={routeMapper}
      style={{top: -20}}
    />
  }
/>
```

## Alert stack example

Much like a route stack, you can keep an alert stack as an array of alert objects in your component's state. The StatusBarAlert will render the first alert in the stack, so that as new alerts are pushed into the stack, it will render the most recent alert. If an alert is popped from the stack, StatusBarAlert will render any remaining alerts and when the stack is empty, StatusBarAlert will hide itself. Additionally, the object spread operator (`{...this.state.alerts[0]}`) allows you to declare the default props for alerts in `render()` (e.g. `backgroundColor="#3CC29E"`) and override those props in the alert object (e.g. `backgroundColor="#FF6245"`).

```js
render() {
  return (
    <View style={styles.container}>
      <StatusBarAlert
        backgroundColor="#3CC29E"
        color="white"
        visible={this.state.alerts.length > 0}
        {...this.state.alerts[0]}
      />
      <Navigator
        initialRoute={initialRoute}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={routeMapper}
            style={{top: -20}}
          />
        }
      />
    </View>
  )
}
showSilentAlert() {
  this.setState({
    alerts: [{
      message: 'Silent Switch ON',
      onPress: () => this.navigator.push({id: 'SilentAlert'}),
      backgroundColor="#FF6245"
    }, ...this.state.alerts]
  })
}
hideSilentAlert() {
  this.setState({
    alerts: this.state.alerts.filter(alert => alert.message !== 'Silent Switch ON')
  })
}
```
