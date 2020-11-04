import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default HomeScreen = () => {
      return(
        <View style={styles.container}>
          <Text> This is my Home screen </Text>
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