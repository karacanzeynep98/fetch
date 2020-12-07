import React from 'react';
import Text from "../components/Text";
import {Modal, StyleSheet} from 'react-native';

import { 
  View,
} from 'react-native';

class NoCards extends React.Component {
  render() {
    return (
      <View>
        <Modal visible={true}>
          <View style={StyleSheet.modalContent}>
            <Text>Hello from the modal</Text>
          </View>
        </Modal>
        <Text large semi center>No more cards!</Text>
        <Text large semi center color="#917467">Invite friends to explore</Text>
      </View>
    )
  }
}

export default NoCards