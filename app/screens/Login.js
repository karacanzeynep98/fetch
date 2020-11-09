import React from 'react';
// import styles from '../styles'
import RootNavigator from '../navigation/RootNavigator';
import { connect } from 'react-redux';
import { login } from '../redux/actions'
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import firebaseConfig from '../config/firebase.js'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Login extends React.Component {
  state = {}

  UNSAFE_componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.dispatch(login(true))
        console.log("We are authenticated now!" + JSON.stringify(user));
      }
    });
  }

  login = async () => {
    console.log("Facebook login called");
        try {
          await Facebook.initializeAsync({
            appId: '1291192777894833',
          });
          const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            alert(`Hi ${(await response.json()).name}!`);
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            console.log("GOT THE CREDENTIAL", credential);
            firebase.auth().signInWithCredential(credential).catch(error => {
              console.log(error);
            });
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
  } 

  render() {
    if(this.props.loggedIn){
      return (
        <RootNavigator/>
      )
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.login.bind(this)}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      )      
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps)(Login);
