import { createSlice } from "@reduxjs/toolkit";

const LoginMessageSlice = createSlice({
  name: "LoginMessageSlice",
  initialState: {
    label: "",
  },
  reducers: {
    setLoginMessage: (state, action) => {
      state.label = action.payload;
    },
  },
});

export const { setLoginMessage } = LoginMessageSlice.actions;

export const loginMessageSelector = (state) => state.loginMessage.label;

export const loginMessageReducer = LoginMessageSlice.reducer;
