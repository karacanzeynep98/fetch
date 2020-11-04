import React, { useContext, useState } from "react";
import styled from "styled-components";

import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

import Text from "../components/Text";

export default SignInScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const signIn = async () => {
        setLoading(true); 
        
        try {
            await firebase.signInWithGoogleAsync();

            setUser({
                isLoggedIn: true,
            });
        } catch (error) {
            alert.errorMessage();
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
            <GoogleSignIn onPress={signIn} disabled={loading}>
                {loading ? (
                        <Loading />
                    ) : (
                    <Text bold center>Sign In with Google</Text>
                    )}
                </GoogleSignIn>
                <FacebookSignIn disabled={loading}>
                {loading ? (
                        <Loading />
                    ) : (
                    <Text bold center>Sign In with Facebook</Text>
                    )}
                </FacebookSignIn>
            </SignInContainer>

            <SignUp onPress={() => navigation.navigate("SignUp")}>
                <Text medium center>Haven't fetched yet? <Text medium bold color="#917467" center>Take a look.</Text></Text>
            </SignUp>



            <StatusBar barStyle="light-content" />
        </Container>
    );
};

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
