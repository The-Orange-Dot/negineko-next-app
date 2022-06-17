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
    screenColor: "none",
    textColor: "rgba(0,0,0,1)",
    position: [0, 0],
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
    resetRaffle: (state: any) => {
      state.winner = "";
      state.winnerBool = false;
      state.selectButton = {};
    },
    selectTimer: (state, action) => {
      state.timer = action.payload.timer;
      state.timerSelected = action.payload.timerSelected;
    },
    setScreenColor: (state, action) => {
      state.screenColor = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const {
  setScreenColor,
  winnerSelected,
  winner,
  resetRaffle,
  addButton,
  deleteButton,
  selectButton,
  syncButtons,
  selectTimer,
  setTextColor,
  setPosition,
} = giveawaySlice.actions;
export default giveawaySlice.reducer;
