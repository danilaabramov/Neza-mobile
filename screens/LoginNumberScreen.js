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
  Platform, TextInputComponent, TextInput, AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import {
  Colors,
} from "react-native/Libraries/NewAppScreen";

import Setting from "../icons/Setting";
import { Context } from "./Navigation";
import { url } from "../utils/Client";

import { useSelector, useDispatch } from "react-redux";
import { fetchAuthCheck } from "../redux/userSlice";

const LoginNumberScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";

  const textStyle = {
    color: isDarkMode ? Colors.white : Colors.black,
  };

  const { number, setNumber } = useContext(Context);
  const [err, setErr] = useState("");
  const sceenState = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const check = async () => {
    const data = await dispatch(fetchAuthCheck({ number }));
    if (data.payload.message === "true")
      navigation.navigate("LoginPassword");
    else if (number?.length < 10)
      setErr("Введите номер телефона");
    else setErr("Пользователь не найден");
  };

  const handleNumber = (e) => {
    setNumber(
      (e[0] ? e[0] : "")
      + (e[1] ? e[1] : "")
      + (e[2] ? e[2] : "")
      + (e[3] ? e[3] : "")
      + (e[4] ? e[4] : "")
      + (e[5] ? e[5] : "")
      + (e[6] ? e[6] : "")
      + (e[7] ? e[7] : "")
      + (e[8] ? e[8] : "")
      + (e[9] ? e[9] : "")
      + (e[10] ? e[10] : ""));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "black", height: "100%" }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "light-content"}
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>

      <View style={{ height: Platform.OS === "android" ? 30 : 0 }}></View>

      <View style={{ marginTop: 74, marginHorizontal: 16 }}>
        <Text style={{ color: "white", fontSize: 48 }}>Нам нужно найти ваш <Text
          style={{ color: "#B544B7" }}>аккаунт.</Text></Text>
      </View>

      <View style={{ margin: 16 }}>
        <Text style={{ color: "white", fontSize: 18 }}>Введите в поле номер телефона, к которому привязан
          аккаунт.</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TextInput keyboardType="numeric"
                   placeholderTextColor="#767779"
                   placeholder="89999999999"
                   style={{
                     color: "white",
                     padding: 14,
                     fontSize: 15,
                     borderWidth: 1,
                     borderColor: err === "" ? "#767779" : "#E93333",
                     height: 48,
                     marginTop: 40,
                     borderRadius: 15,
                     marginHorizontal: 37,
                   }}
                   onSubmitEditing={() => {
                     if (sceenState.status === "loaded" && err === "") check();
                   }}
                   onChangeText={e => {
                     handleNumber(e);
                     setErr("");
                   }} value={number} />
      </KeyboardAvoidingView>

      <View style={{ alignItems: "center" }}>
        <View style={{ height: 48 }}>
          <Text style={{ color: "red" }}>{err}</Text>
        </View>
        <TouchableOpacity activeOpacity={err === "" ? .7 : 1} onPress={() => {
          if (sceenState.status === "loaded" && err === "") check();
        }}
                          style={{
                            backgroundColor: err === "" ? "black" : "#48494C",
                            height: 48,
                            width: 237,
                            borderRadius: 58,
                            justifyContent: "center",
                            borderWidth: err === "" ? 3 : 0,
                            borderColor: "#B544B7",
                          }}>
          <Text style={{
            color: "#FCDEDE",
            textAlign: "center",
          }}>{sceenState.status === "loading" ? "Загрузка..." : "Продолжить"}</Text>
        </TouchableOpacity>
      </View>


        <View style={{ marginTop: 31, alignItems: "center" }}>
          <Text style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: 15 }}>У меня нет аккаунта</Text>
          <TouchableOpacity activeOpacity={.7} onPress={() => {
            navigation.navigate("RegisterName");
          }} style={{ marginTop: 8 }}>
            <Text style={{ color: "#B544B7", textDecorationLine: "underline" }}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


    </SafeAreaView>

  );
};


export default LoginNumberScreen;
