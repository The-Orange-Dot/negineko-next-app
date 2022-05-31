import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    addToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addToken } = tokenSlice.actions;
export default tokenSlice.reducer;
