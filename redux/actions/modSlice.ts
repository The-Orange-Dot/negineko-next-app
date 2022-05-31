import { createSlice } from "@reduxjs/toolkit";

export const modSlice = createSlice({
  name: "mods",
  initialState: {
    modData: [],
    mods: [],
  },
  reducers: {
    storeMods: (state, action) => {
      state.mods = action.payload;
    },
    storeModData: (state, action) => {
      state.modData = action.payload;
    },
  },
});

export const { storeMods, storeModData } = modSlice.actions;
export default modSlice.reducer;
