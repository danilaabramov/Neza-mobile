import React, {createContext, useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import UserScreen from "./UserScreen";
import Menu from "../icons/Menu";
import Setting from "../icons/Setting";
import { View, Platform, AsyncStorage, useColorScheme } from "react-native";
import Chart from "../icons/Chart";
import Chat from "../icons/Сhat";
import Globe from "../icons/Globe";
import User from "../icons/User";
import SettingsScreen from "./SettingsScreen";
import ChartScreen from "./ChartScreen";
import BellScreen from "./BellScreen";
import GlobeScreen from "./GlobeScreen";
import LoginNumberScreen from "./LoginNumberScreen";
import LoginPasswordScreen from "./LoginPasswordScreen";
import StartScreen from "./StartScreen";
import StockScreen from "./StockScreen";
import PostScreen from "./PostScreen";
import ChatScreen from "./ChatScreen";
import RegisterNameScreen from "./RegisterNameScreen"
import RegisterNumberScreen from "./RegisterNumberScreen"
import RegisterPasswordScreen from "./RegisterPasswordScreen"

import { blackTheme, purpleTheme } from "../colors/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = createStackNavigator();



const MyTabs = () => {
  const isDarkMode = useColorScheme() === "dark";
  const theme = isDarkMode ? blackTheme : purpleTheme

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "grey",
      tabBarStyle: {
        backgroundColor: theme.bottomBar,
        borderTopWidth: 0,
        height: 75,
      },
    }}
    >
      <Tab.Screen name="HomeScreen" component={HomeStackScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                      <View style={{ marginTop: Platform.OS === "ios" ? 26 : 0 }}>
                        <Menu color={color} />
                      </View>
                    ),
                  }} />
      <Tab.Screen name="ChartStack" component={ChartStackScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                      <View style={{ marginTop: Platform.OS === "ios" ? 26 : 0 }}>
                        <Chart color={color} />
                      </View>
                    ),
                  }} />

      <Tab.Screen name="UserStack" component={UserStackScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                      <View style={{ marginTop: Platform.OS === "ios" ? 26 : 0 }}>
                        <User color={color} />
                      </View>
                    ),
                  }} />
      <Tab.Screen name="ChatStack" component={ChatStackScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                      <View style={{ marginTop: Platform.OS === "ios" ? 26 : 0 }}>
                        <Chat color={color} />
                      </View>
                    ),
                  }} />
      <Tab.Screen name="GlobeScreen" component={GlobeStackScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                      <View style={{ marginTop: Platform.OS === "ios" ? 26 : 0 }}>
                        <Globe color={color} />
                      </View>
                    ),
                  }} />
    </Tab.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{animationEnabled: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Post" component={PostScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
};

const GlobeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Globe" screenOptions={{animationEnabled: false}}>
      <HomeStack.Screen name="Globe" component={GlobeScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
};


const ChartStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{animationEnabled: false}}>
      <HomeStack.Screen name="Chart" component={ChartScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Stock" component={StockScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
};

const UserStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{animationEnabled: false}}>
      <HomeStack.Screen name="User" component={UserScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Stock" component={StockScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Bell" component={BellScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
};

const ChatStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{animationEnabled: false}}>
      <HomeStack.Screen name="Chat" component={ChatScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
};

const Context = createContext(null);

const Navigation = () => {
  const [user, setUser] = useState({})
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [patronymic, setPatronymic] = useState('');
  const [interest, setInterest] = useState('');


  return (
    <Context.Provider value={{
      user, setUser,
      number, setNumber,
      password, setPassword,
      name, setName,
      surname, setSurname,
      patronymic, setPatronymic,
      interest, setInterest
    }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animationEnabled: false}}>

        <Stack.Screen name="Start" component={StartScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="LoginNumber" component={LoginNumberScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="LoginPassword" component={LoginPasswordScreen} options={{
          headerShown: false,
        }} />

        <Stack.Screen name="RegisterName" component={RegisterNameScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="RegisterNumber" component={RegisterNumberScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="RegisterPassword" component={RegisterPasswordScreen} options={{
          headerShown: false,
        }} />

        <Stack.Screen name="HomeDrawer" component={MyTabs} options={{
          headerShown: false,
        }} />

        {/*<Stack.Screen name="Settings" component={SettingsScreen} options={{*/}
        {/*  headerShown: false,*/}
        {/*}} />*/}
      </Stack.Navigator>

    </NavigationContainer>
    </Context.Provider>

  );
};

export {Navigation, Context};
