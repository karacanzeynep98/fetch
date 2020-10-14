import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

export default function App() {
  console.log("CMON!");

  // const handlePress = () => console.log("Text pressed");

  // console.log(Dimensions.get("screen"));

  // console.log(useDimensions());
  // console.log(useDeviceOrientation());

  // const { landscape } = useDeviceOrientation(); // object destructuring

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <Text numberOfLines={1} onPress={handlePress}>
  //       Welcome to Dress Code!
  //     </Text>
  //     <TouchableWithoutFeedback onPress={() => console.log("Image tapped")}>
  //       <Image
  //         source={{
  //           uri: "https://picsum.photos/200/300",
  //           width: 200,
  //           height: 300,
  //         }}
  //       />
  //     </TouchableWithoutFeedback>
  //     <StatusBar style="auto" />
  //   </SafeAreaView>
  // );

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <Button
  //       color="orange"
  //       title="Click Me"
  //       onPress={() =>
  //         Alert.alert("My title", "My message", [
  //           { text: "Yes", onPress: () => console.log("YES") },
  //           { text: "No", onPress: () => console.log("NO") },
  //         ])
  //       }
  //     />
  //   </SafeAreaView>
  // );

  //CALLBACK FUNCTION
  // return (
  //   // <SafeAreaView style={{ backgroundColor: "orange" }}>
  //   <SafeAreaView style={[styles.container, containerStyle]}>
  //     <Button
  //       color="orange"
  //       title="Click Me"
  //       onPress={() =>
  //         Alert.prompt("My title", "My message", (text) => console.log(text))
  //       }
  //     />
  //   </SafeAreaView>
  // );
  // return (
  //   // <SafeAreaView style={{ backgroundColor: "orange" }}>
  //   <SafeAreaView style={styles.container}>
  //     <View
  //       style={{
  //         backgroundColor: "dodgerblue",
  //         width: "50%",
  //         height: landscape ? "100%" : "70%",
  //       }}
  //     ></View>
  //   </SafeAreaView>
  // );
  // return (
  //   <View
  //     style={{
  //       backgroundColor: "#ffff",
  //       flex: 1,
  //       flexDirection: "row", // horizontal
  //       justifyContent: "center", // main
  //       alignItems: "center", //secondary DETERMINES THE ALIGNMENT OF ITEMS WITHIN EACH LINE
  //       alignContent: "center", // all about wrapping!!
  //       flexWrap: "wrap",
  //     }}
  //   >
  //     <View
  //       style={{
  //         backgroundColor: "dodgerblue",
  //         width: 100,
  //         height: 300,
  //         alignSelf: "flex-start",
  //       }}
  //     />
  //     <View
  //       style={{
  //         backgroundColor: "gold",
  //         width: 100,
  //         height: 100,
  //       }}
  //     />
  //     <View
  //       style={{
  //         backgroundColor: "tomato",
  //         width: 100,
  //         height: 100,
  //       }}
  //     />
  //     <View
  //       style={{
  //         backgroundColor: "green",
  //         width: 100,
  //         height: 100,
  //       }}
  //     />
  //     <View
  //       style={{
  //         backgroundColor: "grey",
  //         width: 100,
  //         height: 100,
  //       }}
  //     />
  //   </View>
  // );
}

const containerStyle = { backgroundColor: "orange" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

// OPTIMIZATION BEHIND THE SCENES
