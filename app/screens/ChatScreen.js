import React from 'react';
import { Text, View } from 'react-native';

export default class ChatScreen extends React.Component {
    render() {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
          <Text> This is my Chat screen </Text>
        </View>
      );
    }
  }