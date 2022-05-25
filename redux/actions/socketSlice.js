import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    value: {},
    connected: false,
  },
  reducers: {
    addSocket: (state, action) => {
      state.value = action.payload;
    },
    eraseSocket: (state, action) => {
      state.value = {};
    },
    connected: (state) => {
      state.connected = true;
    },
    disconnected: (state) => {
      state.connected = false;
    },
  },
});

export const { addSocket, eraseSocket, connected, disconnected } =
  socketSlice.actions;
export default socketSlice.reducer;
