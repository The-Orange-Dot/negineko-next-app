import { configureStore } from "@reduxjs/toolkit";
import giveawaySlice from "./actions/giveawaySlice";
import loginSlice from "./actions/userLoginSlice";
import tokenSlice from "./actions/tokenSlice";

export default configureStore({
  reducer: {
    giveaway: giveawaySlice,
    login: loginSlice,
    token: tokenSlice,
  },
});
