import React from "react";

import { ImageBackground, StyleSheet, View, Text } from "react-native";

import colors from "../config/colors";
function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/DressRoom.jpg")}
    >
      <View style={styles.registerButton}></View>
      <View style={styles.loginButton}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "colors.primary",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "colors.secondary",
  },
});

export default WelcomeScreen;
