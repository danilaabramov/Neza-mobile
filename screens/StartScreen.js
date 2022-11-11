import React, { useContext, useEffect, useState } from "react";
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
  Platform, TextInputComponent, TextInput, Dimensions, AsyncStorage,
} from "react-native";
import {
  Colors,
} from "react-native/Libraries/NewAppScreen";

import { Context } from "./Navigation";
import normalize from "../utils/Normalize";
import Logo from "../icons/Logo";
import { url } from "../utils/Client";

const { height, width } = Dimensions.get("window");


const StartScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";

  const { setUser, user, setPosts } = useContext(Context);

  const textStyle = {
    color: isDarkMode ? Colors.white : Colors.black,
  };

  const [loading, setLoading] = useState(true);

  useEffect(async () => {

    //await AsyncStorage.removeItem('user');
    const value = await AsyncStorage.getItem("user");
    if (value !== null) {
      setUser(JSON.parse(value));
      setTimeout(() => setLoading(false), 1000);
      if (JSON.parse(value).token) {
        navigation.navigate("HomeDrawer");
      }
    } else setTimeout(() => setLoading(false), 1000);

  }, []);


  if (loading) return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <View style={{backgroundColor: "black", height: '120%', position: 'relative', top: 0, width, zIndex: 10000}}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "light-content"}
        translucent
        backgroundColor="transparent"
      />
      <View style={{ height: Platform.OS === "android" ? 30 : 0 }}></View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>

      <View style={{ alignItems: "center", justifyContent: 'center', height }}>
      <Image style={{
        height: 300,
        width: 300,
      }} source={require("../icons/logo.png")} />
      </View>



      </ScrollView>

      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "black", height: '100%' }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "light-content"}
        translucent
        backgroundColor="transparent"
      />
      <View style={{ height: Platform.OS === "android" ? 30 : 0 }}></View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>

      <View style={{ alignItems: "center" }}>
        <Image style={{
          height: normalize(250),
          width: normalize(250),
          marginTop: 16,
          borderRadius: 23,
        }} source={require("../icons/logo.png")} />
      </View>

      <View style={{ marginTop: 30, marginHorizontal: 65 }}>
        <Text style={{ color: "white", fontSize: normalize(30), fontWeight: "600" }}>Добро пожаловать в <Text
          style={{ color: "rgba(221, 84, 224, 0.8)" }}>Neza!</Text></Text>
      </View>

      <View style={{ marginTop: 16, marginHorizontal: 65 }}>
        <Text style={{ color: "rgba(255, 255, 255, 0.57)", fontSize: normalize(14) }}>Мобильное приложение для обучения
          и
          распределение твоих доходов
          путем выгодных инвестиций.</Text>
      </View>


      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterName")}
          activeOpacity={.7}
          style={{
            marginTop: 38,
            borderWidth: 2,
            borderColor: "#B544B7",
            height: 48,
            width: 237,
            borderRadius: 58,
            justifyContent: "center",
          }}>
          <Text style={{ color: "white", textAlign: "center", fontWeight: "700" }}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 31, alignItems: "center" }}>
        <Text style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: 15 }}>Уже есть аккаунт?</Text>
        <TouchableOpacity activeOpacity={.7} onPress={() => {
          navigation.navigate("LoginNumber");
        }} style={{ marginTop: 8 }}>
          <Text style={{ color: "#B544B7", textDecorationLine: "underline" }}>Войти</Text>
        </TouchableOpacity>
      </View>





      </ScrollView>


    </SafeAreaView>

  );
};


export default StartScreen;
