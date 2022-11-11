import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../utils/Client";
import { AsyncStorage } from "react-native";

export const fetchStocks = createAsyncThunk("stocks", async () => {
  const data = await fetch(url + "/stocks")
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
});

export const fetchStock = createAsyncThunk("stock", async ({symbol}) => {
  // const data = await fetch(url + "/stocks/get/" + symbol)
  // .then((response) => response.json())
  // .catch((error) => {
  //   console.error(error);
  // });
  return {};
});


const initialState = {
  stocks: null,
  status: "loaded",
}

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStocks.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStocks.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.stocks = action.payload;
    },
    [fetchStocks.rejected]: (state) => {
      state.status = "error";

    }
  }
})

export default stocksSlice.reducer
