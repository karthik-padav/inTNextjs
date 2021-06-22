import { configureStore } from "@reduxjs/toolkit";
import loggedUserSlice from "redux/slices/loggedUserSlice";
import uiSlice from "redux/slices/uiSlice";
import askListSlice from "redux/slices/askListSlice";

export default configureStore({
  reducer: {
    loggedUser: loggedUserSlice,
    askList: askListSlice,
    ui: uiSlice,
  },
});
