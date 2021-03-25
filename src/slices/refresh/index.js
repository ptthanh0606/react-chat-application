import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refreshSlice",
  initialState: {
    trigger: {},
  },
  reducers: {
    triggerRefresh: (state, action) => {
      console.log("Hello");
      state = action.payload;
    },
  },
});

export const { triggerRefresh } = refreshSlice.actions;

export const refreshSelector = (state) => state.refresh.triggger;

export const refreshReducer = refreshSlice.reducer;
