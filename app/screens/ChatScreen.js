import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ChatScreen = () => {
      return(
        <View style={styles.container}>
          <Text> This is my Chat screen </Text>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});