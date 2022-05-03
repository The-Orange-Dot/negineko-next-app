import { createSlice } from "@reduxjs/toolkit";

export const giveawaySlice = createSlice({
  name: "giveaway",
  initialState: {
    value: {},
  },
  addButton: (state, action) => {
    state.value = action.payload;
  },
});

export const { addButton } = giveawaySlice.actions;
export default giveawaySlice.reducer;
