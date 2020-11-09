// import React, { useContext } from "react";
// import { createStackNavigator } from "@react-navigation/stack";

// import AuthStackScreens from "./AuthStackScreens";
// import MainStackScreens from "./MainStackScreens";
// import LoadingScreen from "../screens/LoadingScreen";

// import { UserContext } from "../context/UserContext";

// export default AppStackScreens = () => {
//     const AppStack = createStackNavigator();
//     const [user] = useContext(UserContext);

//     return (
//         <AppStack.Navigator headerMode="none">
//                 {user.isLoggedIn === null ? (
//                 <AppStack.Screen name="Loading" component={LoadingScreen} />
//             ) : user.isLoggedIn ? (
//                 <AppStack.Screen name="Main" component={MainStackScreens} />
//             ) : (
//                 <AppStack.Screen name="Auth" component={AuthStackScreens} />
//             )}
//         </AppStack.Navigator>
//     );
// };

import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStackScreens from "./AuthStackScreens";
import MainStackScreens from "./MainStackScreens";
import LoadingScreen from "../screens/LoadingScreen";
import { connect } from 'react-redux';

import { UserContext } from "../context/UserContext";

function AppStackScreens (props) {
    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext);

    return (
        <AppStack.Navigator headerMode="none">
                {props.loggedIn === null ? (
                <AppStack.Screen name="Loading" component={LoadingScreen} />
            ) : props.loggedIn ? (
                <AppStack.Screen name="Main" component={MainStackScreens} />
            ) : (
                <AppStack.Screen name="Auth" component={AuthStackScreens} />
            )}
        </AppStack.Navigator>
    );
};

function mapStateToProps(state) {
    return {
      loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(AppStackScreens);
