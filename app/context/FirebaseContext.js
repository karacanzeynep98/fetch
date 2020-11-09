import React, { createContext } from "react";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../config/firebase";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const FirebaseContext = createContext();

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {

    getCurrentUser: () => {
        return firebase.auth().currentUser;
    },
    
    getFirebaseAuth: () => {
      return firebase.auth();
    },

    isUserEqual : (googleUser, firebaseUser) => {
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
    },

    onSignIn : (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!Firebase.isUserEqual(googleUser, firebaseUser)) {
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
                        // console.log("This is SNAPSHOT", snapshot);
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
        }.bind(Firebase));
    },

    signInWithGoogleAsync : async() => {
        try {
            console.log("TRYING");
          const result = await Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '542847370188-24cvaip35jil9ae413rmb5inhnfslhle.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              Firebase.onSignIn(result);
              console.log("SUCCESS")
            return result.accessToken;
          } else {
              console.log("FAILED");
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    },

    signInWithFacebook: async () =>  {
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
    },

    uploadProfilePhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid;

        try {
            const photo = await Firebase.getBlob(uri);

            const imageRef = firebase.storage().ref("profilePhotos").child(uid);
            await imageRef.put(photo);

            const url = await imageRef.getDownloadURL();

            await db.collection("users").doc(uid).update({
                profilePhotoUrl: url,
            });

            return url;
        } catch (error) {
            console.log("Error @uploadProfilePhoto: ", error);
        }
    },

    getBlob: async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                resolve(xhr.response);
            };

            xhr.onerror = () => {
                reject(new TypeError("Network request failed."));
            };

            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
    },

    logOut: async () => {
        try {
            await firebase.auth().signOut();
            console.log("Successfully signed out");
            return true;
        } catch (error) {
            console.log("Error @logOut: ", error);
        }
        return false;
    },
}


const FirebaseProvider = (props) => {
return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export { FirebaseContext, FirebaseProvider };