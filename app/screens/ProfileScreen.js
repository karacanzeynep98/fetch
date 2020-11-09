import React, { useContext }  from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styled from "styled-components";
import { connect } from 'react-redux';
import { logout } from '../redux/actions'

function ProfileScreen (props) {

      return(
        <Container>
          <Logout onPress={() => props.dispatch(logout())}>
          <Text medium bold color="#23a8d9">
              Log out
          </Text>
        </Logout>
          <Text>Hi user {props.user.id}!</Text>
          <Text>Hi {props.user.name}</Text>
          <Image style={{ width: 75, height: 75}} source={{uri: props.user.photoUrl}}/>
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