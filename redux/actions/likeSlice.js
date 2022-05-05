import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  liked: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addLike: (state) => {
      state.count += 1;
      state.liked = true;
    },
    subtractLike: (state) => {
      state.count -= 1;
      state.liked = false;
    },
  },
});

export const { addLike, subtractLike } = counterSlice.actions;
export default counterSlice.reducer;
