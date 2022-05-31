import { createSlice } from "@reduxjs/toolkit";

export const modSlice = createSlice({
  name: "mods",
  initialState: {
    mods: [],
  },
  reducers: {
    storeMods: (state, action) => {
      state.mods = [];
    },
  },
});

export const { storeMods } = modSlice.actions;
export default modSlice.reducer;
