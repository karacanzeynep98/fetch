import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStackScreens from "./AuthStackScreens";
import MainStackScreens from "./MainStackScreens";
import LoadingScreen from "../screens/LoadingScreen";
import ChatScreen from "../screens/ChatScreen";
import { connect } from 'react-redux';

import { UserContext } from "../context/UserContext";

function AppStackScreens (props) {
    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext);

    return (
        <AppStack.Navigator headerMode="none">
                {user.isLoggedIn === null ? (
                <AppStack.Screen name="Loading" component={LoadingScreen} />
            ) : props.loggedIn ? (
                <AppStack.Screen name="Main" component={MainStackScreens} />
            ) : (
                <AppStack.Screen name="Auth" component={AuthStackScreens} />
            )}
            <AppStack.Screen name="Chat" component={ChatScreen} />
        </AppStack.Navigator>
    );
};

function mapStateToProps(state) {
    return {
      loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(AppStackScreens);
