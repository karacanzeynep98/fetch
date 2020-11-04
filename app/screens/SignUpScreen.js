import React, { useContext, useState } from "react";
import styled from "styled-components";

import Text from "../components/Text";

import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

export default SignUpScreen = ({navigation}) => {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const signUp = async () => {

        setLoading(true);

        const user = { username, email, password};

        try {
            const createdUser = await firebase.createUser(user);

            setUser({ ...createdUser, isLoggedIn: true });

            console.log()
        } catch (error) {
            console.log("Error @signUp: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Main>
                <Text big semi center>let's find your</Text>
            </Main>
            <Main_fetch>
                <Text title semi center>fetch</Text>
            </Main_fetch>

            <Auth>
                <AuthContainer>
                    <AuthTitle>Username</AuthTitle>
                    <AuthField
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    onChangeText={username => setUsername(username.trim())}
                    value={username}
                    />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Email Address</AuthTitle>
                    <AuthField
                        autoCapitalize="none"
                        autoCompleteType="email"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={(email) => setEmail(email.trim())}
                        value={email}
                    />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Password</AuthTitle>
                    <AuthField
                    autoCapitalize="none"
                    autoCompleteType="password"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password.trim())}
                    value={password}                    
                    />
                </AuthContainer>
            </Auth>

            <SignUpContainer onPress={signUp} disabled={loading}>
            {loading ? (
                    <Loading />
                ) : (
                <Text bold center>Sign Up</Text>
                )}
            </SignUpContainer>

            <SignIn onPress={() => navigation.navigate("SignIn")}>
                <Text medium center>Ready to fetch? <Text medium bold color="#DDC0B4" center>Sign In</Text></Text>
            </SignIn>

            <StatusBar barStyle="light-content" />
        </Container>
    );
};

const Auth = styled.View`
    margin: 64px 32px 32px;
`;

const AuthContainer = styled.View`
    margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
    color: #8e93a1;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`;

const AuthField = styled.TextInput`
    border-bottom-color: #8e93a1;
    border-bottom-width: 0.5px;
    height: 48px;
`;

const Container = styled.View`
    flex:1
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
    color: "#ffffff",
    size: "small",
}))``;

const SignUpContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #DDC0B4;
    border-radius: 6px;
`;

const Main = styled.View`
    margin-top: 192px;
`;

const Main_fetch = styled.View`
    margin-top: 12px;
`;

const StatusBar = styled.StatusBar``;

const SignIn = styled.TouchableOpacity`
    margin-top: 36px;
`;
