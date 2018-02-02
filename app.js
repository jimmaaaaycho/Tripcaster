import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Alert,
  TextInput,
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import secrets from './secrets'
import Podcast from './screens/Podcast';
import { Button, FormLabel, FormInput } from 'react-native-elements'

export default class App extends React.Component {
 
 static navigationOptions = {
  title: 'TripCaster',
  headerStyle: {
    backgroundColor: '#3b5998',
  },
  headerTitleStyle: {
    color: '#fff'
  }
 };


  state = {
    user: undefined, // user has not logged in yet
    currentLocation: '',
    destination: '',
    searchQuery: '',
    listenNotesURL: 'https://listennotes.p.mashape.com/api/v1/search?offset=&',
    len_min: 10,
    len_max: 50,
    offset: 0,
    text: '',
    travelMode: 'DRIVING'
  };

/*------------- PASSPORT LOGIN -------------*/
  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('http://localhost:3000/auth/facebook');

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('http://localhost:3000/auth/google');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

/*---------- END PASSPORT LOGIN ----------*/

/*----------- LISTEN NOTES API ------------*/

  podcastSearchURL = `${this.state.listenNotesURL}`

  _onPressButton() {

      const params = {
          offset: this.state.offset,
          len_min: this.state.len_min,
          len_max: this.state.len_max,
          q: this.state.searchQuery 
      };
      const esc = encodeURIComponent;
      const query = Object.keys(params)
          .map(k => esc(k) + '=' + esc(params[k]))
          .join('&');
      console.log(this.podcastSearchURL+query)
      console.log(secrets)
      fetch(this.podcastSearchURL+query, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Mashape-Key': secrets.podcasts
          }
      })
      .then(res => {
          // console.log(res);
          // console.log(JSON.parse(res._bodyText));
          // let titles = [];
          // // // console.log("RES LENGTH IS: " + res._bodyText.results.length)
          // for (var i = 0; i<9;i++) {
          //   titles[i] = JSON.parse(res._bodyText).results[i].podcast_title_original;
          // }
          this.props.navigation.navigate('Second', {title: JSON.parse(res._bodyText)});
          // console.log(titles);
          // return res.json();
      })
      .catch((error) => {
          console.log('Error', error); // no error is returned
          throw error;
    })

  };

  otherPressButton() {
      // this.props.navigation.navigate('Maps');
      var origin1 = new google.maps.LatLng(55.930385, -3.118425);
      var origin2 = 'Greenwich, England';
      var destinationA = 'Stockholm, Sweden';
      var destinationB = new google.maps.LatLng(50.087692, 14.421150);

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
          {
              origins: [this.state.currentLocation],
              destinations: [this.state.destination],
              travelMode: this.state.travelMode,
          }, callback);

      function callback(response, status) {
      //The DistanceMatrixResponse object contains one row for each origin 
      //that was passed in the request. Each row contains an element field 
      //for each pairing of that origin with the provided destination(s).
          if (status == 'OK') {
              var origins = response.originAddresses;
              var destinations = response.destinationAddresses;

          for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                  var element = results[j];
                  var distance = element.distance.text;
                  var duration = element.duration.text;
                  var from = origins[i];
                  var to = destinations[j];
                  }
              }
              console.log(results)
          }

      }
  };

  enterText(value) {
      console.log(value) 
      this.state.text = value 
      this.setState(this.state)
  };

  enterSearch(value) {
      console.log('Search: ' + value)
      this.state.searchQuery = value
      this.setState(this.state)
  };

  enterLocation(value) {
      this.state.currentLocation = value
      this.setState(this.state)
  };

  enterDestination(value) {
      this.state.destination = value
      this.setState(this.state)
  };

/*----------- END LISTEN NOTES API ------------*/

  render() {
    const {navigate} = this.props.navigation;
    const { user } = this.state;
    return (
    <View style={styles.container}>
        { user
          ? // Show user info if already logged in
          // <View style={styles.homeContainer}>
          //   <View style={styles.row}>
          //       <Text style={styles.label}>
          //           Current Location:
          //       </Text>
          //       <TextInput 
          //           style={styles.textInput}
          //           onChangeText={this.enterLocation.bind(this)}
          //       >
          //       </TextInput>
          //   </View>
          //   <View style={styles.row}>
          //       <Text style={styles.label}>
          //           Destination:
          //       </Text>
          //       <TextInput 
          //           style={styles.textInput}
          //           onChangeText={this.enterDestination.bind(this)}
          //       >
          //       </TextInput>
          //   </View>
          //   <View style={styles.row}>
          //       <Text style={styles.label}>
          //           What topic are you interested in?
          //       </Text>
          //       <TextInput 
          //           style={styles.textInput}
          //           onChangeText={this.enterSearch.bind(this)}
          //       >
          //       </TextInput>
          //   </View>
          //   <Button
          //       className = "submit_button"
          //       onPress={this._onPressButton.bind(this)}
                
          //       title="Submit for ListenNotes Response"
          //       accessibilityLabel="Press this button to get episodes for your commute">
          //       Submit for Listen Notes
          //   </Button>
          //   <Button
          //       className = "submit_button"
          //       onPress={this.otherPressButton.bind(this)}
          //       title="Submit for Maps Response"
          //       accessibilityLabel="Press this button to get episodes for your commute">
          //       Submit for Maps
          //   </Button>
          // </View>
          <View>
              <View>
                  <FormLabel>Current Location:</FormLabel>
                  <FormInput onChangeText={this.enterLocation.bind(this)}/>
              </View>

              <View>
                  <FormLabel>Destination:</FormLabel>
                  <FormInput onChangeText={this.enterDestination.bind(this)}/>
              </View>

              <View>
                  <FormLabel>Interested Topic:</FormLabel>
                  <FormInput onChangeText={this.enterSearch.bind(this)}/>
              </View>

              <Button
                title='Listen Notes'
                backgroundColor='#3b5998'
                onPress={this._onPressButton.bind(this)}
                large
                style={styles.Button}/>

              <Button
                title='Maps'
                backgroundColor='#3b5998'
                onPress={this.otherPressButton.bind(this)}
                large
                style={styles.Button}
                />
          </View>
          : // Show Please log in message if not
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome To Trip Caster
              </Text>
              <View style={styles.avatar}>
                <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
              </View>
              <Text style={styles.text}>
                Please log in to continue
              </Text>
              {/* Login buttons */}
              <View style={styles.buttons}>
                <Icon.Button
                  name="facebook"
                  backgroundColor="#3b5998"
                  onPress={this.loginWithFacebook}
                  {...iconStyles}
                >
                  Login with Facebook
                </Icon.Button>
                <Icon.Button
                  name="google"
                  backgroundColor="#DD4B39"
                  onPress={this.loginWithGoogle}
                  {...iconStyles}
                >
                  Or with Google
                </Icon.Button>
              </View>
            </View>
        }
        
      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  Button : {
    paddingVertical: 10
  },
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
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
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
  submit_button: {
      borderColor: '#60b7e2',
      borderWidth: 1,  
  },
  textInput: {
      textAlign: 'left',
      color: '#333333',
      margin: 5,
      marginBottom: 30,
      height: 50,
      borderColor: '#60b7e2',
      borderWidth: 1,
      flex: 2
  },
  row: {
      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'center',
      height: 50
  },
  label: {
      textAlign: 'right',
      margin: 10,
      flex: 1,
      color: '#60b7e2',
  },
});

const myscreens = StackNavigator({
  First: {screen: App},
  Second: {screen: Podcast}
})

AppRegistry.registerComponent('OAuthLogin', () => myscreens);