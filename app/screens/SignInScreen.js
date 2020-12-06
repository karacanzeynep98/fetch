import React, { useState } from "react";
import { Image } from 'react-native';
import styled from "styled-components";
import { connect } from 'react-redux';
import { login } from '../redux/actions'
import Text from "../components/Text";
import styles from '../../styles.js'

import config from "../config/firebase";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


function SignInScreen (props) {

    const [loading, setLoading] = useState(false);

    const isUserEqual = (googleUser, firebaseUser) => {
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

    
    const onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!isUserEqual(googleUser, firebaseUser)) {
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
        });
    }

    const signInWithGoogleAsync = async() => {
        try {
            console.log("TRYING");
          const result = await Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '542847370188-24cvaip35jil9ae413rmb5inhnfslhle.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              onSignIn(result);
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

    const signInGoogle = async () => {
        setLoading(true); 
        
        try {
            await signInWithGoogleAsync();

            firebase.auth().onAuthStateChanged(user => {
                if (user != null) {
                console.log("state = definitely signed in")
                console.log("We are authenticated now!" + JSON.stringify(user));
                props.dispatch(login(user));
                // setUser({
                //     isLoggedIn: true,
                // });
              }
            });

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    const signInWithFacebook = async () =>  {
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

    const signInFacebook = async () => {
        setLoading(true); 
        
        try {
            await signInWithFacebook();

            firebase.auth().onAuthStateChanged(user => {
                if (user != null) {
                console.log("state = definitely signed in")
                console.log("We are authenticated now!" + JSON.stringify(user));
                props.dispatch(login(user));
              }
            });
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Main>
                <Image source={require('/Users/zeynepkaracan/Desktop/DressCode/app/assets/TRIAL3.png')}/>
                <Text huge semi center margin="36px">fetch</Text>
            </Main>
            <SignInContainer>
            <GoogleSignIn onPress={signInGoogle} disabled={loading}>
                {loading ? (
                        <Loading />
                    ) : (
                    <Text bold center>Sign In with Google</Text>
                    )}
                </GoogleSignIn>
                <FacebookSignIn onPress={signInFacebook} disabled={loading}>
                {loading ? (
                        <Loading />
                    ) : (
                    <Text bold center>Sign In with Facebook</Text>
                    )}
                </FacebookSignIn>
            </SignInContainer>

            <SignUp onPress={() => props.navigation.navigate("SignUp")}>
                <Text medium center>Haven't fetched yet? <Text medium bold color="#917467" center>Take a look.</Text></Text>
            </SignUp>



            <StatusBar barStyle="light-content" />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
      loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(SignInScreen);

const Container = styled.View`
    flex:1
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
    color: "#ffffff",
    size: "small",
}))``;

const GoogleSignIn = styled.TouchableOpacity`
    margin: 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #EBCBBE;
    border-radius: 6px;
`;

const FacebookSignIn = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    border-radius: 6px;
`;

const Main = styled.View`
    margin-top: 204px;
    align-items: center;
`;

const SignInContainer = styled.View`
    margin-top: 64px;
`;

const StatusBar = styled.StatusBar``;

const SignUp = styled.TouchableOpacity`
    margin-top: 36px;
`;

