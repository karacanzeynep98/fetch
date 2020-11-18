import React, { useContext, useState, useEffect }  from 'react';
import firebase from "firebase";
import styled from "styled-components";
import { connect } from 'react-redux';
import styles from '../../styles.js'

import { 
  Text, 
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

function MatchesScreen (props) {

  const [chats, setChats] = useState([]);

  useEffect(() => {
    firebase.database().ref('cards/' + props.user.id + '/chats').on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        item = child.val();
        items.push(item); 
      });
      setChats(items.reverse());
    });
  }, [])

      return(
        <Container>
          <View style={styles.container} >
           <ScrollView>
             {chats.map((uri)=>{
               return (
                 <TouchableOpacity key={uri.user} style={styles.imgRow} onPress={() => props.navigation.navigate("Chat", {user: uri.user})}>
                   <Image style={styles.imgChat} source={{uri: uri.user.photoUrl}} />
                   <Text style={[styles.bold, styles.center]}>{uri.user.name}</Text>
                 </TouchableOpacity>
               );
             })}
           </ScrollView>
          </View>
          </Container>
      );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(MatchesScreen);

const Container = styled.View`
    align-items: center;
    margin-top: 64px;
    flex: 1;
`;