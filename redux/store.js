import { configureStore } from "@reduxjs/toolkit";
import giveawayReducer from "./giveawayItems";

export default configureStore({
  reducer: {
    giveawayItem: giveawayReducer,
  },
});
