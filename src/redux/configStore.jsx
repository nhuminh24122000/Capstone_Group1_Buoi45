import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./slices/User";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    cartReducer: cartReducer,
    userReducer: userReducer,

  },
});