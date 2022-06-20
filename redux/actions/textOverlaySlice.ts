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
      const parsedText = JSON.parse(action.payload);

      const filtered = state.value.filter((text) => {
        const parsed = JSON.parse(text);

        if (parsed.id !== parsedText.id) {
          return text;
        }
      });

      state.value = [...filtered, action.payload];
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
      const parsed = state.value.filter((text) => {
        const parsedText = JSON.parse(text);

        if (parsedText.id === action.payload) {
          return JSON.stringify(parsedText);
        }
      });
      state.selected = parsed[0];
    },
    purgeTexts: (state) => {
      state.value = [];
    },
  },
});

export const {
  addText,
  subtractText,
  updateText,
  savePosition,
  setSelectedText,
  purgeTexts,
} = textOverlaySlice.actions;
export default textOverlaySlice.reducer;
