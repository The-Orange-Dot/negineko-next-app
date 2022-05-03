import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loginUser } = loginSlice.actions;
export default loginSlice.reducer;
