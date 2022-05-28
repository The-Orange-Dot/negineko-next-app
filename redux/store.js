import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import giveawayReducer from "./actions/giveawaySlice";
import loginSlice from "./actions/userLoginSlice";
import tokenSlice from "./actions/tokenSlice";
import locationSlice from "./actions/locationSlice";
import counterReducer from "./actions/likeSlice";
import darkModeReducer from "./actions/darkModeSlice";
import juiceBoxReducer from "./actions/juiceboxMenuSlice";
import socketReducer from "./actions/socketSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["giveaway", "user", "darkMode"],
  blacklist: ["socket"],
};

const rootReducer = combineReducers({
  giveaway: giveawayReducer,
  user: loginSlice,
  token: tokenSlice,
  location: locationSlice,
  counter: counterReducer,
  darkMode: darkModeReducer,
  juicebox: juiceBoxReducer,
  socket: socketReducer,
});

// const rootReducer = {
//   giveaway: giveawayReducer,
//   user: loginSlice,
//   token: tokenSlice,
//   location: locationSlice,
//   counter: counterReducer,
//   darkMode: darkModeReducer,
//   juicebox: juiceBoxReducer,
//   socket: socketReducer,
// };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
