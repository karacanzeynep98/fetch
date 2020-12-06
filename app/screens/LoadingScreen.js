import React, { useEffect, useContext } from 'react';
import styled from 'styled-components'
import LottieView from "lottie-react-native";

import Text from "../components/Text";
import {UserContext} from "../context/UserContext"
import { connect } from 'react-redux';
import { login } from '../redux/actions'

function LoadingScreen (props) {

    console.log(UserContext)

    const [_, setUser] = useContext(UserContext)

    useEffect(() => {
        setTimeout(async ()  => {
            setUser((state) => ({...state, isLoggedIn: false}))
            props.dispatch(login(false));
        }, 1500)
    }, [])


    return (
        <Container>
            <Text title color="#000000">
                fetch
            </Text>

            <LottieView
                source={require("../assets/loadingAnimation.json")}
                autoPlay
                loop
                style={{ width: "100%" }}
            />
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
`;

function mapStateToProps(state) {
    return {
      loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(LoadingScreen);