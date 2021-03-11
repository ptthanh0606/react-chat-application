import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/auth/authSlice";
import { messageReducer } from "../slices/message";
import { selectedUUIDReducer } from "../slices/selecteduuid";
import { loginMessageReducer } from "../slices/auth/loginMessage";

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    selectedUUID: selectedUUIDReducer,
    loginMessage: loginMessageReducer,
  },
});
