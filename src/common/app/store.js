import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../feartures/postSlice";
import authReducer from '../feartures/authSlice';



export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: authReducer
  },
});
