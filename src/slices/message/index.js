import { createSlice } from "@reduxjs/toolkit";

const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessage: (state, action) => {},
  },
});

export const { setMessage } = MessageSlice.actions;

export const messageSelector = (state) => state.message.messages;

export const messageReducer = MessageSlice.reducer;
