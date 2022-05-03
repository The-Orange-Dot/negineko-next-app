import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    comments: [],
    likes: 0,
  },
  reducers: {},
});

export const {} = locationSlice.actions;
export default locationSlice.reducer;
