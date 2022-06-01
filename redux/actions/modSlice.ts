import { createSlice } from "@reduxjs/toolkit";

export const modSlice = createSlice({
  name: "mods",
  initialState: {
    modData: [],
    mods: [],
    pendingMods: [],
  },
  reducers: {
    storeMods: (state, action) => {
      state.mods = action.payload;
    },
    storeModData: (state, action) => {
      state.modData = action.payload;
    },
    storePendingMods: (state, action) => {
      state.pendingMods = action.payload;
    },
  },
});

export const { storeMods, storeModData, storePendingMods } = modSlice.actions;
export default modSlice.reducer;
