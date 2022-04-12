import { createSlice } from "@reduxjs/toolkit";

export const giveawayItemSlice = createSlice({
  name: "giveawayItem",
  initialState: {
    items: {},
  },
  reducers: {
    addItem: (state, action) => {
      items = { ...state, ...action };
    },
    deleteItem: (state) => {},
  },
});

export const { addItem, deleteItem } = giveawayItemSlice.actions;
export default giveawayItemSlice.reducer;
