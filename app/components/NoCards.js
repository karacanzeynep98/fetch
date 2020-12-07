import React from 'react';
import Text from "../components/Text";
import {Modal, StyleSheet} from 'react-native';
import styled from "styled-components";

import { 
  View,
  Image
} from 'react-native';

class NoCards extends React.Component {

  constructor() {
    super()
    this.state= {
      show: false
    }
  }

  render() {
    return (
      <View>
        <Text large semi center>No more cards!</Text>
        <InviteFriends onPress={() => {this.setState({show: true})}}>
          <Text large semi center color="#917467">Invite friends to explore</Text>
        </InviteFriends>
        <Modal visible={this.state.show} transparent={true}>
          <View style={{backgroundColor: "#000000aa", flex:1}}>
            <View style={{backgroundColor: "#ffffff", margin:50, padding:40, borderRadius:10, flex:1}}>
            <Text large semi center margin="25px">What is <Text large bold color="#917467" center>fetch?</Text></Text>
            <Text large semi center margin="24px">Match</Text>
            <View style={styles.container}>
            <Image style={styles.logo} source={require('/Users/zeynepkaracan/Desktop/DressCode/app/assets/TRIAL3.png')}/>
            </View>
            <Text medium semi center margin="24px">Match with people that share your style.</Text>
            <Text large semi center margin="24px">Chat</Text>
            <View style={styles.container}>
            <Image style={styles.logoChat} source={require('/Users/zeynepkaracan/Desktop/DressCode/app/assets/pnghut_chat-box-online-area.png')}/>
            </View>
            <Text medium semi center margin="24px">Chat to see if you have matching items.</Text>
            <Text large semi center margin="24px">Fetch</Text>
            <View style={styles.container}>
            <Image style={styles.logoSwap} source={require('/Users/zeynepkaracan/Desktop/DressCode/app/assets/hiclipart.com.png')}/>
            </View>
            <Text medium semi center margin="24px">Swap to get new free clothes.</Text>
            <InviteFriends onPress={() => {this.setState({show: false})}}>
              <Text medium semi center color="#917467">Back to fetching</Text>
            </InviteFriends>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default NoCards

const InviteFriends = styled.TouchableOpacity`
    margin-top: 36px;
`;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 78,
    height: 85,
  },
  logoSwap: {
    width: 90,
    height: 90,
  },
  logoChat: {
    width: 75,
    height: 66,
  }
});