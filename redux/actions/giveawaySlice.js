import { createSlice } from "@reduxjs/toolkit";

export const giveawaySlice = createSlice({
  name: "giveaway",
  initialState: {
    buttons: [],
    selected: {},
    winner: "",
    winnerSelected: false,
    timer: [[400, 120, 60, 20]],
    timerSelected: 30,
  },
  reducers: {
    syncButtons: (state, action) => {
      state.buttons = [...state.buttons, ...action.payload];
    },
    addButton: (state, action) => {
      state.buttons.push(action.payload);
    },
    deleteButton: (state, action) => {
      state.buttons = action.payload;
    },
    selectButton: (state, action) => {
      state.selected = action.payload;
    },
    winner: (state, action) => {
      state.winner = action.payload;
    },
    winnerSelected: (state, action) => {
      state.winnerSelected = action.payload;
    },
    resetRaffle: (state) => {
      state.winner = "";
      state.winnerBool = false;
      state.selectButton = {};
    },
    selectTimer: (state, action) => {
      state.timer = action.payload.timer;
      state.timerSelected = action.payload.timerSelected;
    },
  },
});

export const {
  winnerSelected,
  winner,
  resetRaffle,
  addButton,
  deleteButton,
  selectButton,
  syncButtons,
  selectTimer,
} = giveawaySlice.actions;
export default giveawaySlice.reducer;
