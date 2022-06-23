import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
    like: [],
    userData: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload;
    },
    likeLocation: (state, action) => {
      state.like.push(action.payload);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { loginUser, likeLocation, setUserData } = loginSlice.actions;
export default loginSlice.reducer;
