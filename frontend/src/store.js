import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import entryReducer from "./slices/entrySlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    entries: entryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
