import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';

import { login } from '../redux/actions'
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

import Text from "../components/Text";

function SignInScreen (props) {

    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const signInGoogle = async () => {
        setLoading(true); 
        
        try {
            await firebase.signInWithGoogleAsync();


            firebase.getFirebaseAuth().onAuthStateChanged(user => {
                if (user != null) {
                console.log("state = definitely signed in")
                console.log("We are authenticated now!" + JSON.stringify(user));
                props.dispatch(login(true));
                setUser({
                    isLoggedIn: true,
                });
              }
            });

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    const signInFacebook = async () => {
        setLoading(true); 
        
        try {
            await firebase.signInWithFacebook();
            setUser({
                isLoggedIn: true,
            });

            props.dispatch(login(true));
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Main>
                <Text huge semi center>fetch</Text>
            </Main>
            <SignInContainer>
            <GoogleSignIn onPress={signInGoogle} disabled={loading}>
                {loading ? (
                        <Loading />
                    ) : (
                    <Text bold center>Sign In with Google</Text>
                    )}
                </GoogleSignIn>
                <FacebookSignIn onPress={signInFacebook} disabled={loading}>
                {loading ? (
                        <Loading />
                    ) : (
                    <Text bold center>Sign In with Facebook</Text>
                    )}
                </FacebookSignIn>
            </SignInContainer>

            <SignUp onPress={() => props.navigation.navigate("SignUp")}>
                <Text medium center>Haven't fetched yet? <Text medium bold color="#917467" center>Take a look.</Text></Text>
            </SignUp>



            <StatusBar barStyle="light-content" />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
      loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(SignInScreen);

const Container = styled.View`
    flex:1
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
    color: "#ffffff",
    size: "small",
}))``;

const GoogleSignIn = styled.TouchableOpacity`
    margin: 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #EBCBBE;
    border-radius: 6px;
`;

const FacebookSignIn = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    border-radius: 6px;
`;

const Main = styled.View`
    margin-top: 324px;
`;

const SignInContainer = styled.View`
    margin-top: 64px;
`;

const StatusBar = styled.StatusBar``;

const SignUp = styled.TouchableOpacity`
    margin-top: 36px;
`;

