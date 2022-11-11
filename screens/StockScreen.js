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
  Dimensions, AsyncStorage, TextInput,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Setting from "../icons/Setting";
import { Context } from "./Navigation";
import Star from "../icons/Star";
import BarChart from "../icons/BarChart";

import normalize from "../utils/Normalize";

import { LineChart } from "react-native-chart-kit";
import { VictoryChart, createContainer, VictoryScatter, VictoryLine, VictoryAxis } from "victory-native";
import { url } from "../utils/Client";
import { fetchAuthMe, fetchStocksBuy, fetchStocksSell } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { blackTheme, purpleTheme } from "../colors/colors";

const StockScreen = ({ navigation, route }): Node => {
  const isDarkMode = useColorScheme() === "dark";

  const theme = isDarkMode ? blackTheme : purpleTheme

  const sceenState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { width, height } = Dimensions.get("window");
  const { user, setUser } = useContext(Context);

  const getLabels = (ts) => {
    let timeSeries = ts;
    let arr = [];
    for (let i = 0; i < timeSeries.length; ++i) {
      arr.push(timeSeries[i]["time"]);
    }
    return arr;
  };

  const getData = (ts) => {
    let timeSeries = ts;
    let arr = [];
    for (let i = 0; i < timeSeries.length; ++i)
      arr.push({ x: timeSeries[i]["time"], y: Number(timeSeries[i]["price"]) });
    return arr;
  };

  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
  const data = getData(JSON.parse(route.params.timeSeries)).reverse();
  const labels = getLabels(JSON.parse(route.params.timeSeries)).reverse();

  const [buy, setBuy] = useState(false);
  const [sell, setSell] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [err, setErr] = useState("");

  const buyStocks = async () => {
    let q = quantity === "" ? 1 : quantity;
    if (q > 0 && Number(JSON.parse(route.params.timeSeries)[0].price) * q <= user.currencyBalance) {
      const auth = await dispatch(fetchAuthMe({ token: user.token }));
      if (auth.payload?.currencyBalance) {
        if (q > 0 && Number(JSON.parse(route.params.timeSeries)[0].price) * q <= auth.payload.currencyBalance) {
          const data = await dispatch(fetchStocksBuy({ token: user.token, quantity: q, symbol: route.params.symbol }));
          if (data.payload?._id) {
            setUser({
              token: user.token,
              ...data.payload,
            });

            try {
              AsyncStorage.setItem(
                "user",
                JSON.stringify({
                  token: user.token,
                  ...data.payload,
                }),
              );
              setBuy(false);
              setQuantity(1);
            } catch (error) {}
          } else setErr("Ошибка сервера");
        } else setErr("Не достаточно денежных средств");
      } else setErr("Ошибка сервера");
    } else setErr("Не достаточно денежных средств");
  };

  const getQuantity = (stoks, symbol) => {
    let q = 0;
    for (let i = 0; i < stoks.length; ++i)
      if (stoks[i].symbol === symbol)
        q += stoks[i].quantity;
    return q;
  };


  const sellStocks = async () => {
    let q = quantity === "" ? 1 : quantity;
    if (q > 0 && getQuantity(user.stocks, route.params.symbol) >= q) {
      const auth = await dispatch(fetchAuthMe({ token: user.token }));
      if (auth.payload?.stocks) {
        if (q > 0 && getQuantity(auth.payload.stocks, route.params.symbol) >= q) {
          const data = await dispatch(fetchStocksSell({ token: user.token, quantity: q, symbol: route.params.symbol }));

          if (data.payload?._id) {
            setUser({
              token: user.token,
              ...data.payload,
            });

            try {
              AsyncStorage.setItem(
                "user",
                JSON.stringify({
                  token: user.token,
                  ...data.payload,
                }),
              );
              setSell(false);
              setQuantity(1);
            } catch (error) {
              //setErr('Что-то пошло не так...')
            }
          } else setErr("Ошибка сервера");
        } else setErr("Не достаточно акций");
      } else setErr("Ошибка сервера");
    } else setErr("Не достаточно акций");
  };

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
              }} source={{ uri: user["avatarUrl"] }} />
            </TouchableOpacity>

            <View style={{ height: 46, justifyContent: "center", width: "100%", marginRight: -121 }}>
              <Text style={{ fontSize: normalize(24), color: "#fff", fontWeight: "bold" }}>{route.params.name}</Text>
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

            <View style={{ marginTop: 34, marginLeft: 24 }}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>График</Text>
            </View>


            <View style={{ alignItems: "center", marginHorizontal: 16, marginTop: 15 }}>
              <View
                style={[styles.shadowProp, { width: "100%", height: 323, backgroundColor: "white", borderRadius: 10 }]}>

                {data &&
                  <VictoryChart
                    containerComponent={
                      <VictoryZoomVoronoiContainer
                        labels={({ datum }) => `${datum.x}, ${datum.y}`}
                      />
                    }>
                    <VictoryAxis dependentAxis />
                    <VictoryLine data={data} />
                  </VictoryChart>
                }

              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 34 }}>
              <TouchableOpacity onPress={() => setBuy(true)}
                                style={{
                                  height: 48,
                                  width: 159,
                                  borderRadius: 58,
                                  backgroundColor: "#2D5687",
                                  marginRight: 24,
                                  justifyContent: "center",
                                }}>
                <Text style={{ textAlign: "center", fontWeight: "bold", color: "#FCDEDE" }}>Купить</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSell(true)}
                                style={{
                                  height: 48,
                                  width: 159,
                                  borderRadius: 58,
                                  borderColor: "#2D5687",
                                  borderWidth: 1,
                                  justifyContent: "center",
                                }}>
                <Text style={{ textAlign: "center", fontWeight: "bold", color: "#FCDEDE" }}>Продать</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>


          {
            buy && <View style={{
              position: "absolute",
              width: "100%",
              height: height,
              backgroundColor: "rgba(0, 0, 0, .6)",
              justifyContent: "center",
              alignItems: "center",
            }}>

              <View style={{
                width: 300,
                height: 300,
                borderRadius: 58,
                marginBottom: 200,
                backgroundColor: isDarkMode ? theme.background:"#361F49",
                justifyContent: "center",
                alignItems: "center",
              }}>

                <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Сколько акций хотите приобрести?</Text>

                <TextInput style={{
                  color: "white",
                  padding: 14,
                  fontSize: 15,
                  borderWidth: 1,
                  borderColor: "#767779",
                  height: 48,
                  marginTop: 25,
                  width: 250,
                  borderRadius: 15,
                  marginHorizontal: 37,
                }}
                           keyboardType="numeric"
                           placeholder={"1"}
                           placeholderTextColor="rgba(255, 255, 255, .5)"
                           onSubmitEditing={() => {
                             if (sceenState.status === "loaded") {
                               buyStocks();
                             }
                           }}
                           onChangeText={e => {
                             setErr("");
                             setQuantity(e);
                           }} value={quantity} />
                <Text style={{ color: "red", height: 25 }}>{err}</Text>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                  <TouchableOpacity onPress={() => {
                    if (sceenState.status === "loaded") {
                      buyStocks();
                    }
                  }}
                                    style={{
                                      height: 48,
                                      width: 130,
                                      borderRadius: 58,
                                      backgroundColor: "#2D5687",
                                      justifyContent: "center",
                                      marginRight: 10,
                                    }}>
                    <Text style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#FCDEDE",
                    }}>{sceenState.status === "loading" ? "Загрузка..." : "Купить"}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    if (sceenState.status === "loaded") {
                      setBuy(false);
                      setQuantity(1);
                      setErr("");
                    }
                  }}
                                    style={{
                                      height: 48,
                                      width: 130,
                                      borderRadius: 58,
                                      borderColor: "#2D5687",
                                      borderWidth: 1,
                                      justifyContent: "center",
                                    }}>
                    <Text style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#FCDEDE",
                    }}>Отмена</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          }


          {
            sell && <View style={{
              position: "absolute",
              width: "100%",
              height: height,
              backgroundColor: "rgba(0, 0, 0, .6)",
              justifyContent: "center",
              alignItems: "center",
            }}>

              <View style={{
                width: 300,
                height: 300,
                marginBottom: 200,
                borderRadius: 58,
                backgroundColor: isDarkMode ? theme.background:"#361F49",
                justifyContent: "center",
                alignItems: "center",
              }}>

                <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Сколько акций хотите продать?</Text>

                <TextInput style={{
                  color: "white",
                  padding: 14,
                  fontSize: 15,
                  borderWidth: 1,
                  borderColor: "#767779",
                  height: 48,
                  marginTop: 25,
                  width: 250,
                  borderRadius: 15,
                  marginHorizontal: 37,
                }}
                           keyboardType="numeric"
                           placeholder={"1"}
                           placeholderTextColor="rgba(255, 255, 255, .5)"
                           onSubmitEditing={() => {
                             if (sceenState.status === "loaded") {
                               sellStocks();
                             }
                           }}
                           onChangeText={e => {
                             setQuantity(e);
                             setErr("");
                           }} value={quantity} />
                <Text style={{ color: "red", height: 25 }}>{err}</Text>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                  <TouchableOpacity onPress={() => {
                    if (sceenState.status === "loaded") {
                      sellStocks();
                    }
                  }}
                                    style={{
                                      height: 48,
                                      width: 130,
                                      borderRadius: 58,
                                      backgroundColor: "#2D5687",
                                      justifyContent: "center",
                                      marginRight: 10,
                                    }}>
                    <Text style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#FCDEDE",
                    }}>{sceenState.status === "loading" ? "Загрузка..." : "Продать"}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    if (sceenState.status === "loaded") {
                      setSell(false);
                      setQuantity(1);
                      setErr("");
                    }
                  }}
                                    style={{
                                      height: 48,
                                      width: 130,
                                      borderRadius: 58,
                                      borderColor: "#2D5687",
                                      borderWidth: 1,
                                      justifyContent: "center",
                                    }}>
                    <Text style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#FCDEDE",
                    }}>Отмена</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          }


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

});

export default StockScreen;
