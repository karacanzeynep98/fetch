import React, { useContext, useEffect }  from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, TextInput, Text } from 'react-native';
import styled from "styled-components";
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles.js'
import { logout, uploadImages, updateAbout, deleteImage} from '../redux/actions'
import TextStyle from "../components/Text";

function ProfileScreen (props) {

    const deleteImages = (key) => {
      console.log("Delete images pressed! :) ");
      console.log("AND HERE IS THE KEY!", key)
      props.dispatch(deleteImage(props.user.images, key))
    }
  
    const addImage = () => {
      props.dispatch(uploadImages(props.user.images))
    }

      return(
        <Container>
        <ScrollView>
        <View style={[styles.container, styles.center]}>
          <View style={styles.container}>
            <Container>
            <Image style={styles.img} source={{uri: props.user.photoUrl}}/>
            </Container>
              <TextStyle large semi center color="#917467">{props.user.name}</TextStyle>
          </View>
          <View style={styles.imgRow}>
          {props.user.images.map((uri, key) =>{
              return (
                <TouchableOpacity key={key} onPress={() => {deleteImages(key)}}>
                  <Image style={styles.img} source={{uri: uri}} />
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={[styles.img, styles.center]} onPress={addImage}>
              <Ionicons name="ios-add" size={75}  style={styles.color} />
            </TouchableOpacity>
          </View>
          <TextStyle large semi center color="#917467" margin="12px">My style is...</TextStyle>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => props.dispatch(updateAbout(text))}
            value={props.user.aboutMe}/>
        </View>
        <TouchableOpacity onPress={ () => props.dispatch(logout()) }>
          <Text style={ styles.button }>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      </Container>
      );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(ProfileScreen);

const Container = styled.View`
    align-items: center;
    margin-top: 64px;
    flex: 1;
`;

const Logout = styled.TouchableOpacity`
    margin-bottom: 32px;
`;