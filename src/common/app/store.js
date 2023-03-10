import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../feartures/postSlice";



export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});
