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
} from "react-native";
import {
  Colors,
} from "react-native/Libraries/NewAppScreen";

import Setting from "../icons/Setting";
import { Context } from "./Navigation";
import { url } from "../utils/Client";

import { useSelector, useDispatch } from "react-redux";
import { fetchAuthCheck } from "../redux/userSlice";

const RegisterNameScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";

  const textStyle = {
    color: isDarkMode ? Colors.white : Colors.black,
  };

  const { name, setName, surname, setSurname, patronymic, setPatronymic, interest, setInterest } = useContext(Context);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();


  const check = async () => {
    if(!name?.length)
      setErr("Введите Имя");
    else if(!surname?.length)
      setErr("Введите Фамилию");
    else if(!interest?.length)
      setErr("Заполните последнее поле");
    else navigation.navigate('RegisterNumber')
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
        <Text style={{ color: "#B544B7", fontSize: 47 }}>Регистрация.</Text>
      </View>

      <View style={{ margin: 16 }}>
        <Text style={{ color: "white", fontSize: 18 }}>Расскажите нам о себе.</Text>
      </View>

      <TextInput style={{
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
                 placeholderTextColor="#767779"
                 placeholder="Фамилия"
                 onSubmitEditing={() => {
                   if (err === "") check();
                 }}
                 onChangeText={e => {
                   setSurname(e);
                   setErr("");
                 }} value={surname} />
      <TextInput style={{
        color: "white",
        padding: 14,
        fontSize: 15,
        borderWidth: 1,
        borderColor: err === "" ? "#767779" : "#E93333",
        height: 48,
        marginTop: 16,
        borderRadius: 15,
        marginHorizontal: 37,
      }}
                 placeholderTextColor="#767779"
                 placeholder="Имя"
                 onSubmitEditing={() => {
                   if (err === "") check();
                 }}
                 onChangeText={e => {
                   setName(e);
                   setErr("");
                 }} value={name} />
      <TextInput style={{
        color: "white",
        padding: 14,
        fontSize: 15,
        borderWidth: 1,
        borderColor: err === "" ? "#767779" : "#E93333",
        height: 48,
        marginTop: 16,
        borderRadius: 15,
        marginHorizontal: 37,
      }}
                 placeholderTextColor="#767779"
                 placeholder="Отчество"
                 onSubmitEditing={() => {
                   if (err === "") check();
                 }}
                 onChangeText={e => {
                   setPatronymic(e);
                   setErr("");
                 }} value={patronymic} />
        <TextInput style={{
          color: "white",
          padding: 14,
          fontSize: 15,
          borderWidth: 1,
          borderColor: err === "" ? "#767779" : "#E93333",
          height: 48,
          marginTop: 16,
          borderRadius: 15,
          marginHorizontal: 37,
        }}
                   placeholderTextColor="#767779"
                   placeholder="Что вас заинтересовало в проекте?"
                   onSubmitEditing={() => {
                     if (err === "") check();
                   }}
                   onChangeText={e => {
                     setInterest(e);
                     setErr("");
                   }} value={interest} />


      <View style={{ alignItems: "center" }}>
        <View style={{ height: 48 }}>
          <Text style={{ color: "red" }}>{err}</Text>
        </View>
        <TouchableOpacity activeOpacity={err === "" ? .7 : 1} onPress={() => {
          if (err === "") check();
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
          }}>Продолжить</Text>
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


export default RegisterNameScreen;
