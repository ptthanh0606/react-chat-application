import { createSlice } from "@reduxjs/toolkit";

const SelectedsSlice = createSlice({
  name: "SelectedsSlice",
  initialState: {
    uuid: "",
    conversationId: "",
  },
  reducers: {
    setSelectedUUID: (state, action) => {
      state.uuid = action.payload;
    },
    setSelectedConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
  },
});

export const selectedsSelector = (state) => state.selecteds;

export const {
  setSelectedUUID,
  setSelectedConversationId,
} = SelectedsSlice.actions;

export const selectedsReducer = SelectedsSlice.reducer;
