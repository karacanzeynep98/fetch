import React, { useContext }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from "styled-components";
import { connect } from 'react-redux';
import { login, logout } from '../redux/actions'

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";
import { useLinkProps } from '@react-navigation/native';
// import { useLinkProps } from '@react-navigation/native';

function ProfileScreen (props) {

  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const logOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
        // setUser((state) => ({ ...state, isLoggedIn: false }));
        props.dispatch(logout());
    }
  };
      return(
        <Container>
          <Logout onPress={logOut}>
          <Text medium bold color="#23a8d9">
              Log out
          </Text>
        </Logout>
        </Container>
      );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
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