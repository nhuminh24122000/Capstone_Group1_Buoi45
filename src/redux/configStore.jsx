import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import userReducer from "./slices/User";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    userReducer: userReducer,
  },
});