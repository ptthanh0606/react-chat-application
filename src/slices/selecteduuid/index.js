import { createSlice } from "@reduxjs/toolkit";

const SelectedUUIDSlice = createSlice({
  name: "SelectedUUIDSlice",
  initialState: {
    value: "",
  },
  reducer: {
    setSelectedUUID: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const selectedUUIDSelector = (state) => state.selectedUUID.value;

export const { setSelectedUUID } = SelectedUUIDSlice.actions;

export const selectedUUIDReducer = SelectedUUIDSlice.reducer;
