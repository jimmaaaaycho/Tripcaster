import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Alert,
  Button,
  TextInput,
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import App from '../app';


export default class Home extends React.Component {
 static navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {
    color: '#fff'
  }
 };

   render() {
    const {navigate} = this.props.navigation;
    return (
    <View>
    <Text>Test</Text>
    </View>
    );
  }
}