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
  Dimensions, AsyncStorage,
} from "react-native";
import Markdown from 'react-native-markdown-package';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Setting from "../icons/Setting";
import { Context } from "./Navigation";
import Star from "../icons/Star";
import BarChart from "../icons/BarChart";

import normalize from "../utils/Normalize";

import { LineChart } from "react-native-chart-kit";
import { VictoryChart, createContainer, VictoryScatter, VictoryLine, VictoryAxis } from "victory-native";
import { url } from "../utils/Client";
import { blackTheme, purpleTheme } from "../colors/colors";

const PostScreen = ({ navigation, route }): Node => {
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
              <Image style={{
                height: 46,
                width: 46,
                marginLeft: 16,
                marginRight: 16,
                borderRadius: 23,
              }} source={{ uri: user.avatarUrl }} />
            </TouchableOpacity>

            <View style={{ height: 46, justifyContent: "center", width: "100%", marginRight: -121 }}>
              <Text style={{ fontSize: normalize(20), color: "#fff", fontWeight: "bold" }}>{route.params.title}</Text>
            </View>


          </View>
        </View>


        <LinearGradient
          colors={["#2D1A7A", "rgba(57, 30, 77, 0.632023)", "rgba(110, 48, 112, 0.5)", "rgba(89, 36, 109, 0.697765)", "#4F347C", "#87528F"]}
          start={{ x: -0.2, y: 0.1 }} end={{ x: 0.8, y: 0.9 }} style={{ zIndex: -1 }}>

          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: theme.background, minHeight: "100%" }}
          >

            <Image style={{
              height: 200,
              width: '100%',
            }} source={{ uri: route.params.imageUrl
            }} />

            <View style={{color: 'white', fontSize: 20, margin: 16}}>
            <Markdown styles={styles.markdown}>
              {route.params.text}
            </Markdown>
          </View>

            <View style={{ height: Platform.OS === "ios" ? 84 : 114 }} />

          </ScrollView>

        </LinearGradient>

      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#48494C",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  markdown: {
    heading1: {
      color: 'white',
    },
    heading2: {
      color: 'white',
    },
    strong: {
      color: 'white',
    },
    em: {
      color: 'white',
    },
    text: {
      color: 'white',
    }
  }
});

export default PostScreen;
