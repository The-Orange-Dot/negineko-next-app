import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    value: false,
  },
  reducers: {
    darkModeOn: (state, action) => {
      state.value = true;
    },
    darkModeOff: (state, action) => {
      state.value = false;
    },
  },
});

export const { darkModeOn, darkModeOff } = darkModeSlice.actions;
export default darkModeSlice.reducer;
