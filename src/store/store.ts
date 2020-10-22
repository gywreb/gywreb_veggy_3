import { configureStore } from "@reduxjs/toolkit";
import reducer from "./rootReducer";

export default configureStore({
  reducer,
});
