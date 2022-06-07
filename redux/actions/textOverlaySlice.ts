import { createSlice } from "@reduxjs/toolkit";

export const textOverlaySlice = createSlice({
  name: "textOverlay",
  initialState: {
    value: [],
  },
  reducers: {
    addText: (state, action) => {
      state.value.push(action.payload);
    },
    subtractText: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addText, subtractText } = textOverlaySlice.actions;
export default textOverlaySlice.reducer;
