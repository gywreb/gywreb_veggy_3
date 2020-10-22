import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./slices/products";

const reducer = combineReducers({
  products: productsReducer,
});

export default reducer;
