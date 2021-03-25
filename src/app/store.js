import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/auth/authSlice";
import { messageReducer } from "../slices/message";
import { selectedsReducer } from "../slices/selecteds";
import { loginMessageReducer } from "../slices/auth/loginMessage";
import { refreshReducer } from "../slices/refresh";

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    selecteds: selectedsReducer,
    loginMessage: loginMessageReducer,
    refresh: refreshReducer,
  },
});
