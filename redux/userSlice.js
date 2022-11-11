import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../utils/Client";
import { AsyncStorage } from "react-native";

export const fetchAuthCheck = createAsyncThunk("auth/check", async ({number}) => {
  const data = await fetch(url + "/auth/login/check", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      number,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
});

export const fetchAuthLogin = createAsyncThunk("auth/login", async ({number, password}) => {
  const data = await fetch(url + "/auth/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      number,
      password
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
});

export const fetchAuthRegister = createAsyncThunk("auth/register", async ({number, password, fullName, interest}) => {
  const data = await fetch(url + "/auth/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      number,
      email: number,
      password,
      fullName,
      interest
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
});

export const fetchStocksBuy = createAsyncThunk("stocks/buy", async ({token, quantity, symbol}) => {
  const data = await fetch(url + "/stocks/buy", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "authorization": token
    },
    body: JSON.stringify({
      quantity,
      symbol,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
})

export const fetchStocksSell = createAsyncThunk("stocks/sell", async ({token, quantity, symbol}) => {
  const data = await fetch(url + "/stocks/sell", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "authorization": token
    },
    body: JSON.stringify({
      quantity,
      symbol,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
})

export const fetchAuthMe = createAsyncThunk("auth/me", async ({token}) => {
  const data = await fetch(url + "/auth/me", {
    headers: {
      "authorization": token
    }
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
})

const initialState = {
  user: null,
  status: "loaded",
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthCheck.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuthCheck.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchAuthCheck.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
    [fetchAuthLogin.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuthLogin.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchAuthLogin.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
    [fetchStocksBuy.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStocksBuy.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchStocksBuy.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
    [fetchStocksSell.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStocksSell.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchStocksSell.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
    [fetchAuthRegister.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuthRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchAuthRegister.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
  }
})

export default userSlice.reducer
