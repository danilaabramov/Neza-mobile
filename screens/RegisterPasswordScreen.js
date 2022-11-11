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
  Platform, TextInputComponent, TextInput, AsyncStorage,
} from "react-native";
import {
  Colors,
} from "react-native/Libraries/NewAppScreen";

import Setting from "../icons/Setting";
import { Context } from "./Navigation";
import normalize from "../utils/Normalize";
import { url } from "../utils/Client";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthRegister } from "../redux/userSlice";

const RegisterPasswordScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";

  const textStyle = {
    color: isDarkMode ? Colors.white : Colors.black,
  };

  const { password, setPassword, user, setUser, number, name, surname, patronymic, interest } = useContext(Context);
  const [err, setErr] = useState("");

  const sceenState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [password2, setPassword2] = useState("");

  const login = async () => {
    if (password.length < 4)
      setErr("Пароль должен быть минимум 4 символа");
    else if (password !== password2)
      setErr("Пароли не совпадают");
    else {
      const data = await dispatch(fetchAuthRegister({
        number,
        password,
        fullName: surname + " " + name + " " + patronymic,
        interest
      }));
      console.log(data.payload)
      if (data.payload?._id) {
        setUser(data.payload);
        try {
          AsyncStorage.setItem(
            "user",
            JSON.stringify(data.payload),
          );
          navigation.navigate("HomeDrawer");
        } catch (error) {
          setErr("Ой, что-то пошло не так...");
        }
      } else setErr("Неверный пароль");
    }


    //   fetch(url + "/auth/login", {
    //     method: "post",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       "email": number,
    //       "password": password,
    //     }),
    //   })
    //     .then((response) => {
    //       return response.json()
    //     }).then(async json => {
    //     if (json["_id"]) {
    //       setUser(json);
    //       try {
    //         AsyncStorage.setItem(
    //           'user',
    //           JSON.stringify(json)
    //         );
    //         navigation.navigate("HomeDrawer");
    //       } catch (error) {
    //         setErr("Ой, что-то пошло не так...");
    //       }
    //     } else setErr('Неверный пароль')
    //     },
    //   )
    //     .catch((error) => {
    //       console.error(error);
    //       setErr("Ошибка сервера, попробуйте позже");
    //     });
    // }
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
        <Text style={{ color: "white", fontSize: normalize(41) }}>Здравствуйте!</Text>
      </View>

      <View style={{ margin: 16 }}>
        <Text style={{ color: "white", fontSize: 18 }}>Пожалуйста, придумайте <Text
          style={{ color: "#B544B7" }}>пароль.</Text></Text>
      </View>

      <Text
        style={{ marginHorizontal: 37, color: "#D1D2D2", fontSize: 15, marginTop: 31, marginBottom: 9 }}>Пароль</Text>
      <TextInput
        secureTextEntry={true}
        style={{
          color: "white",
          padding: 14,
          fontSize: 15,
          borderWidth: 1,
          borderColor: err === "" ? "#767779" : "#E93333",
          height: 48,
          borderRadius: 15,
          marginHorizontal: 37,
        }}
        onSubmitEditing={() => {
          if (sceenState.status === "loaded" && err === "") login();
        }}
        onChangeText={e => {
          setPassword(e);
          setErr("");
        }}
        value={password}
      />

      <Text style={{ marginHorizontal: 37, color: "#D1D2D2", fontSize: 15, marginTop: 9, marginBottom: 9 }}>Повторите
        пароль</Text>
      <TextInput secureTextEntry={true}
                 style={{
                   color: "white",
                   padding: 14,
                   fontSize: 15,
                   borderWidth: 1,
                   borderColor: err === "" ? "#767779" : "#E93333",
                   height: 48,
                   borderRadius: 15,
                   marginHorizontal: 37,
                 }}
                 onSubmitEditing={() => {
                   if (sceenState.status === "loaded" && err === "") login();
                 }}
                 onChangeText={e => {
                   setPassword2(e);
                   setErr("");
                 }}
                 value={password2}
      />

      <View style={{ alignItems: "center" }}>
        <View style={{ height: 48 }}>
          <Text style={{ color: "red" }}>{err}</Text>
        </View>
        <TouchableOpacity activeOpacity={err === "" ? .7 : 1} onPress={() => {
          if (sceenState.status === "loaded" && err === "") login();
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
          <Text style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: 15 }}>У меня есть аккаунт</Text>
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

export default RegisterPasswordScreen;
