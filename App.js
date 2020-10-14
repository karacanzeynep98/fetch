// @refresh reset
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import * as firebase from "firebase";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import "firebase/firestore";
import {firebaseConfig} from './config';

import LoginScreen from './app/screens/LoginScreen';
import LoadingScreen from './app/screens/LoadingScreen';
import DashboardScreen from './app/screens/DashboardScreen.js';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen: DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent: 'center'
  }
});
