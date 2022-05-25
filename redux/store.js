import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import giveawaySlice from "./actions/giveawaySlice";
import loginSlice from "./actions/userLoginSlice";
import tokenSlice from "./actions/tokenSlice";
import locationSlice from "./actions/locationSlice";
import counterReducer from "./actions/likeSlice";
import darkModeReducer from "./actions/darkModeSlice";
import juiceBoxReducer from "./actions/juiceboxMenuSlice";
import socketReducer from "./actions/socketSlice";

export default configureStore({
  reducer: {
    giveaway: giveawaySlice,
    user: loginSlice,
    token: tokenSlice,
    location: locationSlice,
    counter: counterReducer,
    darkMode: darkModeReducer,
    juicebox: juiceBoxReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
