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
  AppRegistry,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import { Tile, List, ListItem } from 'react-native-elements';

export default class Podcast extends React.Component {

static navigationOptions = {
  title: 'Podcasts',
  headerStyle: {
    backgroundColor: '#3b5998',
  },
  headerTitleStyle: {
    color: '#fff'
  }
 };


 render() {
    // const {navigate} = this.props.navigation;
    const {results} = this.props.navigation.state.params.title
    return (
    <ScrollView>
    {results.map(pod => (
      <TouchableOpacity>
        <List>
            <Text style={styles.header}>{pod.podcast_title_original}</Text>
            <Text style={styles.text}>{pod.title_original}</Text>
            <Text style={styles.text}>{pod.audio_length}</Text>
        </List>
      </TouchableOpacity>
    ))}
    </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  homeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
});