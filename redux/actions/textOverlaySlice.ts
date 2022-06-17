import { createSlice } from "@reduxjs/toolkit";

export const textOverlaySlice = createSlice({
  name: "textOverlay",
  initialState: {
    value: [],
    selected: "",
  },
  reducers: {
    addText: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    subtractText: (state, action) => {
      state.value = action.payload;
    },
    updateText: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
    savePosition: (state, action) => {
      const parsed = action.payload.textOverlay.map((text: any) => {
        return JSON.parse(text);
      });

      const updated = parsed.map((text: any) => {
        if (text.id === action.payload.id) {
          text.position = action.payload.position;
        }

        return JSON.stringify(text);
      });

      state.value = updated;
    },
    setSelectedText: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const {
  addText,
  subtractText,
  updateText,
  savePosition,
  setSelectedText,
} = textOverlaySlice.actions;
export default textOverlaySlice.reducer;
