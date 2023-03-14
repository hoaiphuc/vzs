import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../feartures/postSlice";
import authReducer from '../feartures/authSlice';
import categoryReducer from "../feartures/categorySlice";



export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: authReducer,
    category: categoryReducer,
  },
});
