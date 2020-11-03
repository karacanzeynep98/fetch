import React from 'react';
import { Text, View } from 'react-native';

export default class ProfileScreen extends React.Component {
    render() {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d0d0d0'}}>
          <Text> This is my Profile screen </Text>
        </View>
      );
    }
  }