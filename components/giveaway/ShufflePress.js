import { winner, winnerSelected } from "../../redux/actions/giveawaySlice";

export const ShufflePress = async (
  raffleButtons,
  userArray,
  timer,
  dispatch,
  winnerName
) => {
  console.log("shuffling");

  //Shuffles randomly and chooses a winner
  const shuffleHandler = (i) => {
    if (i === "reset") {
      dispatch(winner([]));
    } else {
      const result = userArray[Math.floor(Math.random() * userArray.length)];
      dispatch(winner(result));
    }
  };

  //Timer for shuffle
  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  //Combines timer and shuffle function to display shuffling
  if (raffleButtons) {
    for (let i = 0; i <= timer[0]; i++) {
      shuffleHandler(i);
      await delay(10);
    }
    for (let i = 0; i <= timer[1]; i++) {
      shuffleHandler(i);
      await delay(50);
    }
    for (let i = 0; i <= timer[2]; i++) {
      shuffleHandler(i);
      await delay(100);
    }
    for (let i = 0; i <= timer[3]; i++) {
      shuffleHandler(i);
      await delay(500);
    }
    dispatch(winner(winnerName));
    dispatch(winnerSelected(true));
    setTimeout(() => {}, 18000);
  }
};
