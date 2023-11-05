import { configureStore } from '@reduxjs/toolkit'
import auth from "./reducers/auth";
import message from "./reducers/message";

const store = configureStore({
  reducer: {
    auth,
    message,
  }
});

export default store;