import { configureStore } from "@reduxjs/toolkit";
import giveawaySlice from "./actions/giveawaySlice";
import loginSlice from "./actions/userLoginSlice";
import tokenSlice from "./actions/tokenSlice";
import locationSlice from "./actions/locationSlice";

export default configureStore({
  reducer: {
    giveaway: giveawaySlice,
    user: loginSlice,
    token: tokenSlice,
    location: locationSlice,
  },
});
