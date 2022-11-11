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
  Platform,
  PixelRatio,
  Dimensions,
  AsyncStorage,
} from "react-native";
import {
  Colors,
} from "react-native/Libraries/NewAppScreen";

import Setting from "../icons/Setting";

import { Context } from "./Navigation";
import normalize from "../utils/Normalize";
import { url } from "../utils/Client";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

import { blackTheme, purpleTheme } from "../colors/colors";
import { fetchAuthMe } from "../redux/userSlice";

const HomeScreen = ({ navigation }): Node => {
  const isDarkMode = useColorScheme() === "dark";

  const theme = isDarkMode ? blackTheme : purpleTheme

  const { width } = Dimensions.get("window");

  const [data, setData] = useState();
  const { user, setUser, number, password, posts, setPosts } = useContext(Context);


  const sceenState = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(async () => {
    !sceenState.posts && dispatch(fetchPosts());
    // const data = await dispatch(fetchAuthMe({ token: user.token }));
    // if(data.payload?._id) {
    //   setUser({
    //     ...data.payload,
    //     token: user.token
    //   })
    //
    //   try {
    //     AsyncStorage.setItem(
    //       "user",
    //       JSON.stringify({
    //         token: user.token,
    //         ...data.payload,
    //       }),
    //     );
    //   } catch (error) {}
    // }

  }, []);


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
              <Text style={{ fontSize: normalize(24), color: "#fff", fontWeight: "bold" }}>
                Обучение</Text>
            </View>

          </View>
        </View>


        <LinearGradient
          colors={["#2D1A7A", "rgba(57, 30, 77, 0.632023)", "rgba(110, 48, 112, 0.5)", "rgba(89, 36, 109, 0.697765)", "#4F347C", "#87528F"]}
          start={{ x: -0.2, y: 0.1 }} end={{ x: 0.8, y: 0.9 }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={{ height: "100%", backgroundColor: theme.background }}>

            <View style={{
              height: 200,
              backgroundColor: "transparent",
            }}>
              <Text style={{ color: "white", fontWeight: "700", marginTop: 18, marginLeft: 15 }}>Недавно
                просмотренное</Text>

              {
                sceenState.status !== "loaded" ?
                <ContentLoader
                  speed={1}
                  width={width}
                  height={160}
                  viewBox={`0 0 ${width} 160`}
                  backgroundColor={theme.backgroundItem}
                  foregroundColor={theme.foreground}
                >
                  <Rect x="15" y="15" rx="20" ry="20" width="210" height="138" />
                  <Rect x="240" y="15" rx="20" ry="20" width="210" height="138" />
                </ContentLoader>
              :
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: "row" }}
                horizontal={true}>
                {
                  sceenState.posts?.length && sceenState.posts.map((item, index) => {
                    return (
                      <TouchableOpacity onPress={() => navigation.navigate("Post", item)} style={{
                        flexDirection: "row",
                        margin: 15,
                        marginRight: 9,
                        marginTop: 12,
                        width: 210,
                        height: 138,

                      }} activeOpacity={.7} key={index}>
                        <Image style={{
                          height: 138,
                          width: 210,
                          borderRadius: 20,
                        }} source={{ uri: item.imageUrl }} />


                        <View width={210} style={{
                          backgroundColor: "transparent",
                          position: "relative",
                          width: 210,
                          left: -210,
                          borderRadius: 20,
                          overflow: "hidden",
                        }}>
                          <LinearGradient
                            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, .65)"]}>
                            <View style={{ backgroundColor: "transparent", width: "100%", height: "100%" }}>

                            </View>
                          </LinearGradient>
                        </View>


                        <View width={210}
                              style={{ position: "relative", left: -420, width: 210, padding: 15 }}>
                          <Text numberOfLines={1}
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  width: "100%",
                                }}>{item.tags[0]}</Text>
                          <Text numberOfLines={3}
                                style={{
                                  color: "white",
                                  height: 75,
                                  fontSize: 15,
                                  width: "100%",
                                }}>{item.title2}</Text>
                          <Text numberOfLines={1}
                                style={{
                                  color: "white",
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  width: "100%",
                                }}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                }
              </ScrollView>
              }
            </View>


            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ flexDirection: "row", paddingLeft: 16, marginBottom: 8, marginTop: 8 }}>
              <TouchableOpacity style={{
                paddingHorizontal: 16,
                height: 40,
                backgroundColor: theme.backgroundActive,
                borderRadius: 10,
                justifyContent: "center",
                marginRight: 7,
              }} activeOpacity={.7}>
                <Text style={{ fontSize: 15, color: theme.colorActive, textAlign: "center" }}>Новые статьи</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                paddingHorizontal: 16,
                height: 40,
                backgroundColor: theme.backgroundItem,
                borderRadius: 10,
                justifyContent: "center",
                marginRight: 7,
              }} activeOpacity={.7}>
                <Text style={{ fontSize: 15, color: "#767779", textAlign: "center" }}>Непрочитанное</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                paddingHorizontal: 16,
                height: 40,
                backgroundColor: theme.backgroundItem,
                borderRadius: 10,
                justifyContent: "center",
                marginRight: 7,
              }} activeOpacity={.7}>
                <Text style={{ fontSize: 15, color: "#767779", textAlign: "center" }}>Популярное</Text>
              </TouchableOpacity>


              <View style={{ width: Platform.OS === "ios" ? 20 : 20 }} />
            </ScrollView>

            <View style={{ marginTop: 16, marginLeft: 24 }}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>Основы</Text>
            </View>

            {sceenState.status !== "loaded" ?
              <ContentLoader
                speed={1}
                width={400}
                height={316}
                viewBox="0 0 400 316"
                backgroundColor={theme.backgroundItem}
                foregroundColor={theme.foreground}
              >
                <Rect x="16" y="16" rx="20" ry="20" width={width - 32} height="300" />
              </ContentLoader>
              : sceenState.posts?.length && sceenState.posts.map((item, index) => {
                return (
                  <View key={index}>
                    {item.tags[0] === "Основы" &&
                      <TouchableOpacity onPress={() => navigation.navigate("Post", item)}
                                        style={{
                                          flexDirection: "row",
                                          margin: 16,
                                          marginVertical: 8,
                                          backgroundColor: "white",
                                          borderRadius: 20,
                                        }}
                                        activeOpacity={.7}>
                        <Image style={{
                          height: 300,
                          width: "100%",
                          borderRadius: 20,
                        }} source={{ uri: item["imageUrl"] }} />


                        <LinearGradient
                          colors={["transparent", "rgba(0, 0, 0, .65)"]}
                          style={{
                            position: "relative",
                            right: width - 32, width: "100%", borderRadius: 20,
                          }}>
                          <View style={{ justifyContent: "flex-end", height: 300 }}>


                            <Text numberOfLines={1}
                                  style={{
                                    color: "white",
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    margin: 20,
                                  }}>{item.title}</Text>
                            {/*<Text numberOfLines={3}*/}
                            {/*      style={{*/}
                            {/*        color: "white",*/}
                            {/*        fontSize: 15,*/}
                            {/*        margin: 16,*/}
                            {/*        marginTop: 0,*/}
                            {/*      }}>{item.title2}</Text>*/}
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    }
                  </View>
                );
              })
            }


            <View style={{ marginTop: 16, marginLeft: 24 }}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>Ценные бумаги</Text>
            </View>

            {sceenState.status !== "loaded" ?
              <ContentLoader
                speed={1}
                width={400}
                height={316}
                viewBox="0 0 400 316"
                backgroundColor={theme.backgroundItem}
                foregroundColor={theme.foreground}
              >
                <Rect x="16" y="16" rx="20" ry="20" width={width - 32} height="300" />
              </ContentLoader>
              : sceenState.posts?.length && sceenState.posts.map((item, index) => {
                return (
                  <View key={index}>
                    {item.tags[0] === "Ценные бумаги" &&
                      <TouchableOpacity onPress={() => navigation.navigate("Post", item)}
                                        style={{
                                          flexDirection: "row",
                                          margin: 16,
                                          marginVertical: 8,
                                          backgroundColor: "white",
                                          borderRadius: 20,
                                        }}
                                        activeOpacity={.7}>
                        <Image style={{
                          height: 300,
                          width: "100%",
                          borderRadius: 20,
                        }} source={{ uri: item["imageUrl"] }} />


                        <LinearGradient
                          colors={["transparent", "rgba(0, 0, 0, .65)"]}
                          style={{
                            position: "relative",
                            right: width - 32, width: "100%", borderRadius: 20,
                          }}>
                          <View style={{ justifyContent: "flex-end", height: 300 }}>


                            <Text numberOfLines={1}
                                  style={{
                                    color: "white",
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    margin: 20,
                                  }}>{item.title}</Text>
                            {/*<Text numberOfLines={3}*/}
                            {/*      style={{*/}
                            {/*        color: "white",*/}
                            {/*        fontSize: 15,*/}
                            {/*        margin: 16,*/}
                            {/*        marginTop: 0,*/}
                            {/*      }}>{item.title2}</Text>*/}
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    }
                  </View>
                );
              })
            }

            <View style={{ marginTop: 16, marginLeft: 24 }}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>Держать или продавать?</Text>
            </View>

            {sceenState.status !== "loaded" ?
              <ContentLoader
                speed={1}
                width={400}
                height={316}
                viewBox="0 0 400 316"
                backgroundColor={theme.backgroundItem}
                foregroundColor={theme.foreground}
              >
                <Rect x="16" y="16" rx="20" ry="20" width={width - 32} height="300" />
              </ContentLoader>
              : sceenState.posts?.length && sceenState.posts.map((item, index) => {
                return (
                  <View key={index}>
                    {item.tags[0] === "Держать или продавать?" &&
                      <TouchableOpacity onPress={() => navigation.navigate("Post", item)}
                                        style={{
                                          flexDirection: "row",
                                          margin: 16,
                                          marginVertical: 8,
                                          backgroundColor: "white",
                                          borderRadius: 20,
                                        }}
                                        activeOpacity={.7}>
                        <Image style={{
                          height: 300,
                          width: "100%",
                          borderRadius: 20,
                        }} source={{ uri: item["imageUrl"] }} />


                        <LinearGradient
                          colors={["transparent", "rgba(0, 0, 0, .65)"]}
                          style={{
                            position: "relative",
                            right: width - 32, width: "100%", borderRadius: 20,
                          }}>
                          <View style={{ justifyContent: "flex-end", height: 300 }}>


                            <Text numberOfLines={1}
                                  style={{
                                    color: "white",
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    margin: 20,
                                  }}>{item.title}</Text>
                            {/*<Text numberOfLines={3}*/}
                            {/*      style={{*/}
                            {/*        color: "white",*/}
                            {/*        fontSize: 15,*/}
                            {/*        margin: 16,*/}
                            {/*        marginTop: 0,*/}
                            {/*      }}>{item.title2}</Text>*/}
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    }
                  </View>
                );
              })
            }


            <View style={{ height: Platform.OS === "ios" ? 84 : 114 }} />
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

export default HomeScreen;
