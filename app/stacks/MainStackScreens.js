import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Foundation } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
// import PostScreen from "../screens/ProfileScreen";
import MatchesScreen from "../screens/MatchesScreen";

export default MainStackScreens = () => {
    const MainStack = createBottomTabNavigator();

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: "#000000",
            paddingBottom: 12,
        },
    };

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName = "ios-home";

            switch (route.name) {
                case "Home":
                    iconName = "magnifying-glass";
                    return <Foundation name={iconName} size={30} color={focused ? "#ffffff" : "#666666"} />;

                case "Chat":
                    iconName = "ios-chatboxes";
                    break;

                case "Profile":
                    iconName = "md-person";
                    break;

                default:
                    iconName = "ios-home";
            }

            return <Ionicons name={iconName} size={30} color={focused ? "#ffffff" : "#666666"} />;
        },
    });

    return (
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <MainStack.Screen name="Home" component={HomeScreen} />
            <MainStack.Screen name="Chat" component={MatchesScreen} />
            <MainStack.Screen name="Profile" component={ProfileScreen} />
        </MainStack.Navigator>
    );
};