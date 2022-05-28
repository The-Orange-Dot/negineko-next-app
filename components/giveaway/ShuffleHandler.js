import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
  deleteButton,
  selectButton,
  winner,
  winnerSelected,
} from "../../redux/actions/giveawaySlice";
import { ShufflePress } from "./ShufflePress";

const ShuffleHandler = () => {
  const dispatch = useDispatch();
  const raffleButtons = useSelector((state) => state.giveaway.buttons);
  const selectedButton = useSelector((state) => state.giveaway.selected);
  const session = useSession();
  const mods = [...session?.data?.mods, ...session?.data?.modFor];
  const timer = useSelector((state) => state.giveaway.timer);
  const userArray = selectedButton?.users;

  //Shuffles and sends shuffle command to websocket
  const shuffle = () => {
    if (userArray) {
      const result = userArray[Math.floor(Math.random() * userArray.length)];

      ShufflePress(raffleButtons, userArray, timer, dispatch, result);
      fetch("api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-shuffle",
          mods: mods,
          body: JSON.stringify({
            timer: timer,
            selectedButton: userArray,
            winnerName: result,
          }),
        }),
      });
    }
  };

  //Deletes Selected button and clears selection state
  const deleteHandler = () => {
    const updatedButtons = raffleButtons.filter((button) => {
      return button.buttonName !== selectedButton.buttonName;
    });
    dispatch(selectButton({}));
    dispatch(deleteButton(updatedButtons));
    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "delete-button",
        mods: mods,
        button: updatedButtons,
      }),
    });
  };

  //Unmounts the button selected and hides on screen
  const resetHandler = () => {
    dispatch(selectButton({}));
    dispatch(winnerSelected(false));
    dispatch(winner(""));

    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "req-reset",
        mods: mods,
      }),
    });
  };

  return (
    <div className={styles.shuffleContainer}>
      <span>
        <button
          onClick={() => {
            shuffle();
          }}
        >
          Shuffle
        </button>
      </span>
      <span>
        <button
          onClick={() => {
            resetHandler();
          }}
        >
          Reset
        </button>
      </span>
      <span>
        <button
          onClick={() => {
            deleteHandler();
          }}
        >
          Delete Selected
        </button>
      </span>
    </div>
  );
};

export default ShuffleHandler;
