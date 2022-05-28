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
    toggleMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { showMenu, hideMenu, toggleMenu } = hideMenuSlice.actions;
export default hideMenuSlice.reducer;
