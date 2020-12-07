import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainStackScreens from "../stacks/MainStackScreens";


const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainStackScreens,
    },
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator/>;
  }
}