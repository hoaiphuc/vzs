import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../feartures/postSlice";
import authReducer from '../feartures/authSlice';
import categoryReducer from "../feartures/categorySlice";
import buildingReducer from "../feartures/buildingSlice";



export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: authReducer,
    category: categoryReducer,
    building: buildingReducer,
  },
});
