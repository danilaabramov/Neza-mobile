import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from './userSlice'
import postsSlice from './postsSlice'
import stocksSlice from "./stocksSlice";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postsSlice,
  stocks: stocksSlice
})

const store = configureStore({
  reducer: rootReducer
})

export default store
