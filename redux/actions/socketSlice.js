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
      state.connected = true;
    },
    eraseSocket: (state, action) => {
      state.value = {};
      state.connected = false;
    },
  },
});

export const { addSocket, eraseSocket } = socketSlice.actions;
export default socketSlice.reducer;
