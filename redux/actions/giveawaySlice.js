import { createSlice } from "@reduxjs/toolkit";

export const giveawaySlice = createSlice({
  name: "giveaway",
  initialState: { buttons: [], selected: {} },
  reducers: {
    addButton: (state, action) => {
      state.buttons.push(action.payload);
    },
    deleteButton: (state, action) => {
      state.buttons = action.payload;
    },
    selectButton: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { addButton, deleteButton, selectButton } = giveawaySlice.actions;
export default giveawaySlice.reducer;
