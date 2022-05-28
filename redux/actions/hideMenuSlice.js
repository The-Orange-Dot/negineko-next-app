import { createSlice } from "@reduxjs/toolkit";

export const hideMenuSlice = createSlice({
  name: "hideMenu",
  initialState: {
    value: false,
  },
  reducers: {
    hideMenu: (state) => {
      state.value = true;
    },
    showMenu: (state) => {
      state.value = false;
    },
  },
});

export const { showMenu, hideMenu } = hideMenuSlice.actions;
export default hideMenuSlice.reducer;
