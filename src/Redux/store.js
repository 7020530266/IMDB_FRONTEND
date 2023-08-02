import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice";
import showDetailReducer from "./showDetail";
import sendMovieUpdateReducer from "./sendMovieUpdate";
import addMovieSliceReducer from "./addMovieSlice";

export const store = configureStore({
  reducer: {
    slice: todoReducer,
    showDetail: showDetailReducer,
    sendMovieUpdate :sendMovieUpdateReducer,
    addMovieSlice :addMovieSliceReducer
  },
});