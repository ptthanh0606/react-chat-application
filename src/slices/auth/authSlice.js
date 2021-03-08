import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoginState } = authSlice.actions;
export const authSelector = (state) => state.auth.isLoggedIn;
export const authReducer = authSlice.reducer;
