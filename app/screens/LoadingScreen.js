import React, { useEffect, useContext } from 'react';
import styled from 'styled-components'
import LottieView from "lottie-react-native";

import Text from "../components/Text";
import {UserContext} from "../context/UserContext"

export default LoadingScreen = () => {

    console.log(UserContext)

    const [_, setUser] = useContext(UserContext)

    useEffect(() => {
        setTimeout(async ()  => {
            setUser((state) => ({...state, isLoggedIn: false}))
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