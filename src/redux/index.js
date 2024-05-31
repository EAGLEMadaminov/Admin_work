import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import headerReducer from "./slices/header";

const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
  },
});

export default store;
