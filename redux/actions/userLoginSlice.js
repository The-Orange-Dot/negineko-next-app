import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    value: "",
    likes: [],
  },
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload;
    },
    likeLocation: (state, action) => {
      state.like.push(action.payload);
    },
  },
});

export const { loginUser, likeLocation } = loginSlice.actions;
export default loginSlice.reducer;
