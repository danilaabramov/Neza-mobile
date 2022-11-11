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
  Platform, Dimensions,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Setting from "../icons/Setting";
import { Context } from "./Navigation";
import Star from "../icons/Star";
import BarChart from "../icons/BarChart";

import normalize from "../utils/Normalize";
import OneStock from "../components/OneStock";

import { blackTheme, purpleTheme } from "../colors/colors";
import { BlurView } from "rn-id-blurview";
import Bell from "../icons/Bell";

const UserScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";
  const { width } = Dimensions.get("window");
  const theme = isDarkMode ? blackTheme : purpleTheme;

  const { user, setUser } = useContext(Context);

  const stackStocks = (stocks) => {
    let arr = [];
    let st = JSON.parse(JSON.stringify(stocks));
    for (let i = 0; i < st.length; ++i) {
      arr.push(st[i]);
      for (let j = i + 1; j < st.length; ++j) {
        if (st[i].symbol === st[j].symbol) {
          arr[arr.length - 1] = {
            symbol: arr[arr.length - 1].symbol,
            quantity: arr[arr.length - 1].quantity + st[j].quantity,
          };
          st.splice(j--, 1);
        }
      }
    }
    return arr;
  };



  const color = "#5C00AB";

  return (
    <View>
     <LinearGradient
      colors={["#361F49", "#2B0348"]}
      start={{ x: 0.0, y: 0.25 }} end={{ x: 1, y: 0.75 }}>

      <View style={{ backgroundColor: theme.topBar, height: "100%" }}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "light-content"}
          translucent
          backgroundColor="transparent"
        />


        {/*<LinearGradient*/}
        {/*  colors={["#361F49", "#2B0348"]}*/}
        {/*  start={{ x: 0.0, y: 0.25 }} end={{ x: 1, y: 0.75 }}>*/}
          <LinearGradient
            colors={["#2D1A7A", "rgba(57, 30, 77, 0.632023)", "rgba(110, 48, 112, 0.5)", "rgba(89, 36, 109, 0.697765)", "#4F347C", "#87528F"]}
            start={{ x: -0.2, y: 0.1 }} end={{ x: 0.8, y: 0.9 }} style={{ zIndex: -1 }}>



            <View style={{  backgroundColor: theme.background }}>


              <View style={{ borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: color, height: 230}}>
                <View style={[styles.shadowProp2, {
                  top: 20,
                  left: 30,
                  height: 110,
                  width: 110,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",
                  position: "absolute",
                  transform: [{ rotate: '45deg' }],
                  opacity: .2
                }]} />
                <View style={[styles.shadowProp2, {
                  top: 10,
                  left: width - 300,
                  height: 130,
                  width: 130,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",
                  position: "absolute",
                  transform: [{ rotate: '45deg' }],
                  opacity: .3
                }]} />
                <View style={[styles.shadowProp2, {
                  top: 0,
                  left: width - 250,
                  height: 150,
                  width: 150,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",
                  position: "absolute",
                  transform: [{ rotate: '45deg' }],
                  opacity: .4
                }]} />
                <View style={[styles.shadowProp2, {
                  top: 10,
                  left: width - 200,
                  height: 200,
                  width: 200,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",
                  position: "absolute",
                  transform: [{ rotate: '45deg' }],
                  opacity: .5
                }]} />

                <View style={{  top: 0,
                  left: 0, width: width, overflow: 'hidden', position: "absolute", borderBottomEndRadius: 10, borderBottomStartRadius: 10, height: 230}}>
                <View style={[styles.shadowProp2, {
                  marginTop: 100,
                  marginLeft: width - 100,
                  height: 150,
                  width: 150,
                  borderRadius: 100,
                  backgroundColor: "#CE00B7",

                  transform: [{ rotate: '45deg' }],
                  opacity: .4
                }]} />
                </View>

                <View style={{
                  top: 170,
                  left: 20,
                  height: 100,
                  width: 200,
                  borderRadius: 100,
                  backgroundColor: "blue",
                  position: "absolute",
                  opacity: .5
                }} />
              </View>

              <View style={{height: 0}}>
                <View style={{position: 'relative', bottom: 230, height: 230, borderBottomEndRadius: 10, borderBottomStartRadius: 10, overflow: 'hidden', width: '100%'}}>
                <BlurView
                  style={{ height: 230 }}

                  blurType="light"
                  blurAmount={40}
                  key={ Platform.select({ android: Math.random().toString(), ios: 'blur' })}
                  overlayColor={Platform.select({ android: 'transparent' , ios: 'rgba(255, 255, 255, .7)' })}
                />
                </View>
              </View>



            </View>

            <View style={{height: 0}}>
            <View style={{height: 230, position: 'relative', bottom: 230 }}>
              <View style={{ height: 83.45, justifyContent: "center", marginTop: 30 }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                    <Image style={{
                      height: 46,
                      width: 46,
                      marginLeft: 16,
                      marginRight: 16,
                      borderRadius: 23,
                    }} source={{ uri: user.avatarUrl }} >

                    </Image>

                  </TouchableOpacity>

                  {/*<View style={{ height: 46, justifyContent: "center", width: "100%", marginRight: -121 }}>*/}
                  {/*  <Text style={{ fontSize: normalize(24), color: "#fff", fontWeight: "bold" }}>Демо-счёт</Text>*/}
                  {/*</View>*/}

                  <View style={{ height: 46, justifyContent: "center", width: "100%", marginRight: -121 }}>
                    <Text style={{ fontSize: 16, color: "#fff" }}>Aкции</Text>
                    <Text style={{
                      fontSize: 16,
                      color: "#fff",
                      fontWeight: "bold",
                    }}>{user.stocksBalance >= 0 ? user.stocksBalance.toFixed(2) : 0} USD</Text>
                  </View>

                  <TouchableOpacity onPress={() => navigation.navigate('Bell')} style={{ justifyContent: 'center'}}>
                    <Bell color={'white'}/>
                  </TouchableOpacity>

                </View>



              </View>

              <View style={{ height: 46, justifyContent: "center", width: "100%", marginLeft: 20, marginTop: 40 }}>
                <Text style={{ fontSize: 16, color: "#fff" }}>Баланс</Text>
                <Text style={{
                  fontSize: 34,
                  color: "#fff",
                  fontWeight: "bold",
                }}>{user.currencyBalance >= 0 ? user.currencyBalance.toFixed(2) : 0} $</Text>
              </View>
            </View>
            </View>

            {/*<View style={{height: 67}}/>*/}
            {/*<View style={{ marginTop: -67, marginBottom: -25, alignItems: "center" }}>*/}
            {/*  <View style={[styles.shadowProp, {*/}
            {/*    backgroundColor: theme.backgroundItem,*/}
            {/*    height: 92,*/}
            {/*    width: 348,*/}
            {/*    borderRadius: 20,*/}
            {/*    flexDirection: "row",*/}
            {/*  }]}>*/}

            {/*    <View style={{ height: "100%", width: "50%" }}>*/}
            {/*      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>*/}
            {/*        <View style={{ width: 0, position: "relative", right: 32 }}>*/}
            {/*          <Star />*/}
            {/*        </View>*/}
            {/*        <View style={{ justifyContent: "center" }}>*/}
            {/*          <Text style={{ color: theme.color, fontSize: 15 }}>“Валюта”</Text>*/}
            {/*        </View>*/}
            {/*      </View>*/}
            {/*      <Text style={{*/}
            {/*        fontSize: 24,*/}
            {/*        color: theme.color,*/}
            {/*        fontWeight: "bold",*/}
            {/*        textAlign: "center",*/}
            {/*      }}>{user.currencyBalance >= 0 ? user.currencyBalance.toFixed(2) : 0}</Text>*/}
            {/*    </View>*/}
            {/*    <View style={{*/}
            {/*      borderWidth: .5,*/}
            {/*      borderColor: "#48494C",*/}
            {/*      marginTop: 16,*/}
            {/*      marginBottom: 16,*/}
            {/*    }} />*/}
            {/*    <View style={{ height: "100%", width: "50%" }}>*/}
            {/*      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>*/}
            {/*        <View style={{ width: 0, position: "relative", right: 32 }}>*/}
            {/*          <BarChart />*/}
            {/*        </View>*/}
            {/*        <View style={{ justifyContent: "center" }}>*/}
            {/*          <Text style={{ color: theme.color, fontSize: 15 }}>Акции</Text>*/}
            {/*        </View>*/}
            {/*      </View>*/}
            {/*      <Text style={{*/}
            {/*        fontSize: 24,*/}
            {/*        color: theme.color,*/}
            {/*        fontWeight: "bold",*/}
            {/*        textAlign: "center",*/}
            {/*      }}>{user.stocksBalance >= 0 ? user.stocksBalance.toFixed(2) : 0}</Text>*/}
            {/*    </View>*/}

            {/*  </View>*/}
            {/*</View>*/}


            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: theme.bottomBar, minHeight: "100%" }}
            >


              {/*<View style={{ marginTop: 55, marginLeft: 24 }}>*/}
              {/*  <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>График</Text>*/}
              {/*</View>*/}

              {/*<View style={{ alignItems: "center", marginHorizontal: 16, marginTop: 15 }}>*/}
              {/*  <View*/}
              {/*    style={[styles.shadowProp, { width: "100%", height: 323, backgroundColor: "white", borderRadius: 10 }]}>*/}

              {/*  </View>*/}
              {/*</View>*/}

              <View style={{ marginTop: 49.5, marginLeft: 24 }}>
                <Text style={{ fontWeight: "bold", color: "white", fontSize: 24,  }}>Портфель</Text>
              </View>

              {
                user?.stocks && stackStocks(user.stocks).map((item, index) => {
                  return (
                    <View key={index}>
                      {
                        item.quantity > 0.0 &&
                        <OneStock navigation={navigation} symbol={item.symbol} quantity={item.quantity} />
                      }
                    </View>

                  );
                })}
              <View style={{ height: Platform.OS === "ios" ? 170 : 200 }} />

            </ScrollView>

          {/*</LinearGradient>*/}
        </LinearGradient>

      </View>
    </LinearGradient>
      </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#48494C",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  shadowProp2: {
    // shadowColor: "#CE00B7",
    // shadowOffset: { width: -100, height: 50 },
    // shadowOpacity: 1,
    // shadowRadius: 50,
  },

});

export default UserScreen;
