import React, { useEffect, useState, useContext } from "react";
import type { Node } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Alert, Button, Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  useColorScheme,
  View,
  Platform,
} from "react-native";
import {
  Colors,
} from "react-native/Libraries/NewAppScreen";
import Setting from "../icons/Setting";
import { Context } from "./Navigation";
import normalize from "../utils/Normalize";
import { blackTheme, purpleTheme } from "../colors/colors";

const GlobeScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";

  const theme = isDarkMode ? blackTheme : purpleTheme

  const { user, setUser } = useContext(Context);

  return (
    <LinearGradient
      colors={["#361F49", "#2B0348"]}
      start={{ x: 0.0, y: 0.25 }} end={{ x: 1, y: 0.75 }}>

      <SafeAreaView style={{ backgroundColor: theme.topBar, height: "100%" }}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "light-content"}
          translucent
          backgroundColor="transparent"
        />
        <View style={{ height: Platform.OS === "android" ? 30 : 0 }}></View>

        <View style={{ height: 83.45, justifyContent: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image
                   style={{
                     height: 46,
                     width: 46,
                     marginLeft: 16,
                     marginRight: 16,
                     borderRadius: 23,
                   }} source={{ uri: user["avatarUrl"] }} />
            </TouchableOpacity>
            <View style={{ height: 46, justifyContent: "center", width: "100%", marginRight: -121 }}>
              <Text style={{ fontSize: normalize(20), fontWeight: 'bold', color: "#fff" }}>Изучай параллельно</Text>
            </View>


          </View>
        </View>


        <LinearGradient
          colors={["#2D1A7A", "rgba(57, 30, 77, 0.632023)", "rgba(110, 48, 112, 0.5)", "rgba(89, 36, 109, 0.697765)", "#4F347C", "#87528F"]}
          start={{ x: -0.2, y: 0.1 }} end={{ x: 0.8, y: 0.9 }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{ backgroundColor: theme.background, minHeight: "100%" }}>
            <View style={{
              alignItems: "center",
              justifyContent: "center",
            }}>


            </View>
          </ScrollView>
        </LinearGradient>


      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

});

export default GlobeScreen;
