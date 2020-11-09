import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import reducers from './app/redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducers, middleware);

import { UserProvider } from "./app/context/UserContext";
import { FirebaseProvider } from "./app/context/FirebaseContext";

import AppStackScreens from "./app/stacks/AppStackScreens";

export default App = () => {
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <UserProvider>
          <NavigationContainer>
            <AppStackScreens />
          </NavigationContainer>
        </UserProvider>
      </FirebaseProvider>
    </Provider>
  );
};






























// // @refresh reset
// import React, {Component} from 'react';
// import {View, StyleSheet} from 'react-native';
// import * as firebase from "firebase";
// import {createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
// import "firebase/firestore";
// import {firebaseConfig} from './config';
// import Icon from "react-native-vector-icons/FontAwesome";

// import LoginScreen from './app/screens/LoginScreen';
// import LoadingScreen from './app/screens/LoadingScreen';
// import DashboardScreen from './app/screens/DashboardScreen.js';
// import HomeScreen from './app/screens/HomeScreen';
// import ProfileScreen from './app/screens/LoadingScreen';
// import ChatScreen from './app/screens/ChatScreen.js';

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }

// const AppSwitchNavigator = createSwitchNavigator({
//   LoadingScreen: LoadingScreen,
//   LoginScreen:LoginScreen,
//   DashboardScreen: DashboardScreen
// })

// const AppNavigator = createAppContainer(AppSwitchNavigator)
// // const AppContainer = createAppContainer(bottomTabNavigator);

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppNavigator/>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//       flex:1,
//       backgroundColor:'#fff',
//       alignItems:'center',
//       justifyContent: 'center'
//   }
// });


