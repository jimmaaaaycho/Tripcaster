'use strict';
    import React, {
        AppRegistry,
        Component,
        StyleSheet,
        View,
        NavigatorIOS
    } from 'react-native';

    var rootPage = require('./root.IOS')
    var client = React.createClass({
      render() {
        return (
            <NavigatorIOS
                style = {styles.container}
                initialRoute={{
              title: "Root",
              navigationBarHidden: true,
              component:rootPage
              }}/>
        );
      }
    });

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      }
    });

    AppRegistry.registerComponent('client', () => client);