import { createSlice } from "@reduxjs/toolkit";

export const juiceBoxMenu = createSlice({
  name: "juicebox",
  initialState: {
    menu: "dashboard",
  },
  reducers: {
    selectMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { selectMenu } = juiceBoxMenu.actions;
export default juiceBoxMenu.reducer;
