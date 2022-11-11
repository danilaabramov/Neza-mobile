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
  Platform, AsyncStorage, Dimensions,
} from "react-native";
import {
  Colors,
} from "react-native/Libraries/NewAppScreen";
import Setting from "../icons/Setting";
import { Context } from "./Navigation";

import BarChart from "../icons/BarChart";
import Star from "../icons/Star";
import normalize from "../utils/Normalize";
import { url } from "../utils/Client";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";
import { fetchStocks } from "../redux/stocksSlice";
import ContentLoader, { Rect } from "react-content-loader/native";

import { blackTheme, purpleTheme} from "../colors/colors";
import USAmarket from "../components/USAmarket";
import RUSmarket from "../components/RUSmarket";

const ChartScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";

  const theme = isDarkMode ? blackTheme : purpleTheme

  const { width, height } = Dimensions.get("window");
  const { user, setUser } = useContext(Context);

  const [price, setPrice] = useState();

  const getArray = (data) => {
    let arr = [];
    for (let i = 0; i < Object.keys(data).length; ++i)
      arr.push({
        time: Object.keys(data)[i],
        price: data[Object.keys(data)[i]]["4. close"],
      });
    return arr;
  };

  const sceenState = useSelector((state) => state.stocks);
  const dispatch = useDispatch();

  //const [stocks, setStocks] = useState()
  const [RUSstocks, setRUSStocks] = useState()
  const [active, setActive] = useState(1)

  const dontPars = (data) => {
    let arr = data
    for(let i = 1; i < arr.length; ++i)
      if(arr[i][3] === arr[i - 1][3]) arr.splice(i---1, 1)
    return arr
  }


  useEffect(() => {
   // !sceenState.stocks && dispatch(fetchStocks());
   //
   //  // fetch(url + "/stocks")
   //  //   .then((response) => response.json()).then(json =>
   //  // {
   //  //   json?.length && setStocks(json);
   //  //
   //  //
   //  // }
   //  // )
   //  //   .catch((error) => {
   //  //     console.error(error);
   //  //   });
   //
   //  !RUSstocks && fetch('https://iss.moex.com/iss/history/engines/stock/markets/shares/securities.json')
   //    .then((response) => response.json()).then(json =>
   //    json?.history && setRUSStocks(dontPars(json?.history.data))//.splice(0, 10))
   //  )
   //    .catch((error) => {
   //      console.error(error);
   //    });

  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4444/stocks/GOOGL")
  //     .then((response) => response.json()).then(
  //     json => {
  //       fetch("http://localhost:4444/stocks", {
  //         method: "post",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           "name": 'Microsoft',
  //           "symbol": 'MSFT',
  //           "imageUrl": 'www',
  //           "timeSeries": JSON.stringify(getArray(json)),
  //         }),
  //       })
  //         .then((response) => response.json()).then(json => {
  //         },
  //       ).catch((error) => {
  //         console.error(error);
  //       });
  //     },
  //   )
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);


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
              <Text style={{ fontSize: normalize(24), color: "#fff", fontWeight: "bold" }}>Котировки</Text>
            </View>

          </View>
        </View>


        <LinearGradient
          colors={["#2D1A7A", "rgba(57, 30, 77, 0.632023)", "rgba(110, 48, 112, 0.5)", "rgba(89, 36, 109, 0.697765)", "#4F347C", "#87528F"]}
          start={{ x: -0.2, y: 0.1 }} end={{ x: 0.8, y: 0.9 }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}

            style={{ minHeight: "100%", backgroundColor: theme.background }}>

            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ flexDirection: "row", paddingLeft: 16, marginBottom: 8, marginTop: 21 }}>
              <TouchableOpacity onPress={() => setActive(0)}
                style={{
                paddingHorizontal: 16,
                height: 40,
                backgroundColor: active === 0 ? theme.backgroundActive : theme.backgroundItem,
                borderRadius: 10,
                justifyContent: "center",
                marginRight: 7,

              }} activeOpacity={.7}>
                <Text style={{ fontSize: 15, color: active === 0 ? theme.colorActive : theme.color, textAlign: "center" }}>Американский рынок</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActive(1)}
                                style={{
                paddingHorizontal: 16,
                height: 40,
                backgroundColor: active === 1 ? theme.backgroundActive : theme.backgroundItem,
                borderRadius: 10,
                justifyContent: "center",
                marginRight: 7,
              }} activeOpacity={.7}>
                <Text style={{ fontSize: 15, color: active === 1 ? theme.colorActive : theme.color, textAlign: "center" }}>Российский рынок</Text>
              </TouchableOpacity>

              <View style={{ width: Platform.OS === "ios" ? 20 : 20 }} />
            </ScrollView>


            <View style={{ marginTop: 21, marginLeft: 24 }}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>Акции</Text>
            </View>
            {
              active === 0 ? <USAmarket navigation={navigation}/> : <RUSmarket navigation={navigation}/>
            }

            {/*{*/}
            {/*  !RUSstocks || sceenState.status !== 'loaded' ? //sceenState.status !== "loaded" ?*/}
            {/*    <ContentLoader*/}
            {/*      speed={1}*/}
            {/*      width={width}*/}
            {/*      height={580}*/}
            {/*      viewBox={`0 0 ${width} ${580}`}*/}
            {/*      backgroundColor={theme.backgroundItem}*/}
            {/*      foregroundColor={theme.foreground}*/}
            {/*    >*/}
            {/*      <Rect x="16" y="15" rx="10" ry="10" width={width - 32} height="82" />*/}
            {/*      <Rect x="16" y="112" rx="10" ry="10" width={width - 32} height="82" />*/}
            {/*      <Rect x="16" y="209" rx="10" ry="10" width={width - 32} height="82" />*/}
            {/*      <Rect x="16" y="306" rx="10" ry="10" width={width - 32} height="82" />*/}
            {/*      <Rect x="16" y="401" rx="10" ry="10" width={width - 32} height="82" />*/}
            {/*      <Rect x="16" y="498" rx="10" ry="10" width={width - 32} height="82" />*/}
            {/*    </ContentLoader>*/}
            {/*    :*/}
            {/*    <View>*/}
            {/*      {*/}
            {/*        (active === 0 ? sceenState.stocks : RUSstocks).map((item, index) => {*/}
            {/*          return (*/}
            {/*            <TouchableOpacity key={index}  onPress={() => active === 0 && navigation.navigate("Stock", { ...item })}*/}
            {/*                              style={[!isDarkMode && styles.shadowProp, {*/}
            {/*                                alignItems: "center",*/}
            {/*                                marginHorizontal: 16,*/}
            {/*                                marginTop: 15,*/}
            {/*                              }]}>*/}
            {/*              <View*/}
            {/*                style={[{*/}
            {/*                  width: "100%",*/}
            {/*                  height: 82,*/}
            {/*                  backgroundColor: theme.backgroundItem,*/}
            {/*                  borderRadius: 10,*/}
            {/*                  flexDirection: "row",*/}
            {/*                  alignItems: "center",*/}
            {/*                }]}>*/}

            {/*                <Image style={{*/}
            {/*                  height: 52,*/}
            {/*                  width: 52,*/}
            {/*                  marginLeft: 16,*/}
            {/*                  marginRight: 16,*/}
            {/*                  borderRadius: 26,*/}
            {/*                }} source={{ uri: active === 0 ? item.imageUrl : ''}} />*/}
            {/*                <View style={{ width: width - 230 }}>*/}
            {/*                  <Text numberOfLines={1} style={{*/}
            {/*                    color: theme.color,*/}
            {/*                    fontSize: normalize(15),*/}
            {/*                    fontWeight: "bold",*/}
            {/*                  }}>{*/}
            {/*                    active === 0 ? item.symbol : item[3]*/}
            {/*                  }</Text>*/}
            {/*                  <Text numberOfLines={1}*/}
            {/*                        style={{ color: "#777684", fontSize: normalize(13) }}>{*/}
            {/*                    active === 0 ? item.name : item[2]*/}
            {/*                  }</Text>*/}
            {/*                </View>*/}

            {/*                <View style={{ width: 100 }}>*/}
            {/*                  <Text numberOfLines={1} style={{*/}
            {/*                    color: theme.color,*/}
            {/*                    fontSize: normalize(16),*/}
            {/*                    textAlign: "right",*/}
            {/*                  }}>*/}
            {/*                    {active === 0 ? Number(JSON.parse(item["timeSeries"])[0]["price"]).toFixed(2) :*/}
            {/*                    item[11] ? item[11] + '$' : item[9] ? item[9] + '$' :''}*/}
            {/*                    </Text>*/}
            {/*                  { active === 0 &&*/}
            {/*                    <Text numberOfLines={1} style={{*/}
            {/*                      color: ((Number(JSON.parse(item["timeSeries"])[0]["price"]) - Number(JSON.parse(item["timeSeries"])[1]["price"])) / (Number(JSON.parse(item["timeSeries"])[1]["price"]) / 100)) < 0 ? "red" : "green",*/}
            {/*                      fontSize: normalize(16), textAlign: "right",*/}
            {/*                    }}>{((Number(JSON.parse(item["timeSeries"])[0]["price"]) - Number(JSON.parse(item["timeSeries"])[1]["price"])) / (Number(JSON.parse(item["timeSeries"])[1]["price"]) / 100)).toFixed(2)}%</Text>*/}
            {/*                  }*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*            </TouchableOpacity>*/}
            {/*          );*/}
            {/*        })}*/}
            {/*    </View>*/}
            {/*}*/}
            <View style={{ height: Platform.OS === "ios" ? 100 : 130 }} />
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

});

export default ChartScreen;
