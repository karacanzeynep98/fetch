import React, { useContext }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from "styled-components";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

export default MatchesScreen = () => {

      return(
        <Container>
          <Logout onPress={logOut}>
          <Text medium bold color="#23a8d9">
              Matches
          </Text>
        </Logout>
        </Container>
      );
}

const Container = styled.View`
    align-items: center;
    margin-top: 64px;
    flex: 1;
`;

const Logout = styled.TouchableOpacity`
    margin-bottom: 32px;
`;