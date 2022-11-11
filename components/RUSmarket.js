import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import normalize from "../utils/Normalize";
import React, { useContext, useEffect, useState } from "react";
import { blackTheme, purpleTheme } from "../colors/colors";
import { Context } from "../screens/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../redux/stocksSlice";
import type { Node } from "react";


const RUSmarket = ({navigation}): Node => {

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
    //!sceenState.stocks && dispatch(fetchStocks());

    // fetch(url + "/stocks")
    //   .then((response) => response.json()).then(json =>
    // {
    //   json?.length && setStocks(json);
    //
    //
    // }
    // )
    //   .catch((error) => {
    //     console.error(error);
    //   });

    !RUSstocks && fetch('https://iss.moex.com/iss/history/engines/stock/markets/shares/securities.json')
      .then((response) => response.json()).then(json =>
        json?.history && setRUSStocks(dontPars(json?.history.data))//.splice(0, 10))
      )
      .catch((error) => {
        console.error(error);
      });

  }, []);

  return (
    <View>
      {
        !RUSstocks ?
          <ContentLoader
            speed={1}
            width={width}
            height={580}
            viewBox={`0 0 ${width} ${580}`}
            backgroundColor={theme.backgroundItem}
            foregroundColor={theme.foreground}
          >
            <Rect x="16" y="15" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="112" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="209" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="306" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="401" rx="10" ry="10" width={width - 32} height="82" />
            <Rect x="16" y="498" rx="10" ry="10" width={width - 32} height="82" />
          </ContentLoader>
          :
          <View>
            {
              RUSstocks.map((item, index) => {
                return (
                  <TouchableOpacity key={index}
                                    onPress={() => active === 0 && navigation.navigate("Stock", { ...item })}
                                    style={[!isDarkMode && styles.shadowProp, {
                                      alignItems: "center",
                                      marginHorizontal: 16,
                                      marginTop: 15,
                                    }]}>
                    <View
                      style={[{
                        width: "100%",
                        height: 82,
                        backgroundColor: theme.backgroundItem,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                      }]}>

                      <Image style={{
                        height: 52,
                        width: 52,
                        marginLeft: 16,
                        marginRight: 16,
                        borderRadius: 26,
                      }} source={{ uri: active === 0 ? item.imageUrl : "" }} />
                      <View style={{ width: width - 230 }}>
                        <Text numberOfLines={1} style={{
                          color: theme.color,
                          fontSize: normalize(15),
                          fontWeight: "bold",
                        }}>{
                          active === 0 ? item.symbol : item[3]
                        }</Text>
                        <Text numberOfLines={1}
                              style={{ color: "#777684", fontSize: normalize(13) }}>{
                          active === 0 ? item.name : item[2]
                        }</Text>
                      </View>

                      <View style={{ width: 100 }}>
                        <Text numberOfLines={1} style={{
                          color: theme.color,
                          fontSize: normalize(16),
                          textAlign: "right",
                        }}>
                          {active === 0 ? Number(JSON.parse(item["timeSeries"])[0]["price"]).toFixed(2) :
                            item[11] ? item[11] + "$" : item[9] ? item[9] + "$" : ""}
                        </Text>
                        {active === 0 &&
                          <Text numberOfLines={1} style={{
                            color: ((Number(JSON.parse(item["timeSeries"])[0]["price"]) - Number(JSON.parse(item["timeSeries"])[1]["price"])) / (Number(JSON.parse(item["timeSeries"])[1]["price"]) / 100)) < 0 ? "red" : "green",
                            fontSize: normalize(16), textAlign: "right",
                          }}>{((Number(JSON.parse(item["timeSeries"])[0]["price"]) - Number(JSON.parse(item["timeSeries"])[1]["price"])) / (Number(JSON.parse(item["timeSeries"])[1]["price"]) / 100)).toFixed(2)}%</Text>
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#48494C",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

});

export default RUSmarket
