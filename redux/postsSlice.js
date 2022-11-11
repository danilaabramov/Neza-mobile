import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../utils/Client";
import { AsyncStorage } from "react-native";

export const fetchPosts = createAsyncThunk("posts", async () => {
  const data = await fetch(url + "/posts/limit/0/date/0")
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
});

const initialState = {
  posts: null,
  status: "loaded",
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.status = "error";
      state.posts = null;
    },
  }
})

export default postsSlice.reducer
