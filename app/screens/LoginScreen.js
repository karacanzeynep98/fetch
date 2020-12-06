import React, {Component} from 'react';
import {ImageBackground, View, Text, StyleSheet, Button} from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

const colors = {
    primary: "darksalmon",
    secondary: "oldnavy",
}

class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken, googleUser.accessToken);
            // Sign in with credential from the Google user.
            firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
                console.log("User signed in");
                if(result.additionalUserInfo.isNewUser) {
                    firebase
                    .database()
                    .ref('/users'+result.user.uid)
                    .set({
                        gmail:result.user.email,
                        profile_picture:result.additionalUserInfo.profile.picture,
                        locale:result.additionalUserInfo.profile.locale,
                        first_name:result.additionalUserInfo.profile.given_name,
                        last_name:result.additionalUserInfo.profile.family_name,
                        created_at: Date.now()
                    })
                    .then(function(snapshot){
                        console.log("This is SNAPSHOT", snapshot);
                    });
                } else {
                    firebase
                    .database()
                    .ref('/users'+result.user.uid).update({
                        last_logged_in: Date.now()
                    });
                }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }

    signInWithGoogleAsync = async() => {
        try {
            console.log("TRYING");
          const result = await Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '542847370188-24cvaip35jil9ae413rmb5inhnfslhle.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result);
              console.log("SUCCESS")
            return result.accessToken;
          } else {
              console.log("FAILED");
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    render() {
        return (
            <ImageBackground style={styles.background} source={require("../assets/DressRoom.jpg")}>
            <View style={styles.registerButton}>
            <Button title="Sign in with Google" onPress={() => { 
                console.log("SIGN IN WITH GOOGLE PRESSED");
                this.signInWithGoogleAsync()}}
            />
            </View>
            <View style={styles.loginButton}>
            <Button title="Sign in with Facebook" onPress={() => { 
                console.log("SIGN IN WITH FACEBOOK PRESSED");}}
            />
            </View>
            </ImageBackground>
          );
    }
    
    
    
}

export default LoginScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
    },
    loginButton: {
        width: "100%",
        height: 59,
        backgroundColor: 'pink',
    },
    registerButton: {
        width: "100%",
        height: 59,
        backgroundColor: 'white',
    },
});