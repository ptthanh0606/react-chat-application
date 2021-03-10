import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserInfo } = authSlice.actions;
export const authSelector = (state) => state.auth.user;
export const authReducer = authSlice.reducer;
