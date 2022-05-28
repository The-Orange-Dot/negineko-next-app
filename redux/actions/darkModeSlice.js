import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    value: false,
    hideMenu: false,
  },
  reducers: {
    darkModeOn: (state) => {
      state.value = true;
    },
    darkModeOff: (state) => {
      state.value = false;
    },
  },
});

export const { darkModeOn, darkModeOff } = darkModeSlice.actions;
export default darkModeSlice.reducer;
