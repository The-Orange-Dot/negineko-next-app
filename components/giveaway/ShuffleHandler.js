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
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ShuffleIcon from "@mui/icons-material/Shuffle";

const ShuffleHandler = ({ menuHidden }) => {
  const dispatch = useDispatch();
  const raffleButtons = useSelector((state) => state.giveaway.buttons);
  const selectedButton = useSelector((state) => state.giveaway.selected);
  const session = useSession();
  const mods = useSelector((state) => state.mods.mods);
  const timer = useSelector((state) => state.giveaway.timer);
  const userArray = selectedButton?.users;
  const connected = useSelector((state) => state.socket.connected);

  //Shuffles and sends shuffle command to websocket
  const shuffle = () => {
    if (userArray) {
      const result = userArray[Math.floor(Math.random() * userArray.length)];

      ShufflePress(raffleButtons, userArray, timer, dispatch, result);
      if (connected) {
        fetch("api/raffleSocket", {
          method: "POST",
          body: JSON.stringify({
            emit: "req-shuffle",
            streamer: session.data.name,
            modFor: session.data.modFor,
            body: JSON.stringify({
              timer: timer,
              selectedButton: userArray,
              winnerName: result,
            }),
          }),
        });
      }
    }
  };

  //Deletes Selected button and clears selection state
  const deleteHandler = () => {
    const updatedButtons = raffleButtons.filter((button) => {
      return button.buttonName !== selectedButton.buttonName;
    });
    dispatch(selectButton({}));
    dispatch(deleteButton(updatedButtons));
    if (connected) {
      fetch("/api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "delete-button",
          streamer: session.data.name,
          modFor: session.data.modFor,
          button: updatedButtons,
        }),
      });
    }
  };

  let deleteValidation;
  if (selectedButton.buttonName) {
    deleteValidation = (
      <Button
        fullWidth
        color="delete"
        size="large"
        variant="contained"
        onClick={() => {
          deleteHandler();
        }}
      >
        <DeleteIcon />
        Delete
      </Button>
    );
  } else {
    deleteValidation = (
      <Button color="delete" size="large" variant="contained" disabled>
        <DeleteIcon /> Delete
      </Button>
    );
  }

  //Unmounts the button selected and hides on screen
  const resetHandler = () => {
    dispatch(selectButton({}));
    dispatch(winnerSelected(false));
    dispatch(winner(""));

    if (connected) {
      fetch("/api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-reset",
          streamer: session.data.name,
          modFor: session.data.modFor,
        }),
      });
    }
  };

  return (
    <div
      className={
        menuHidden ? styles.hiddenShuffleContainer : styles.shuffleContainer
      }
    >
      <Button
        fullWidth
        color="primary"
        size="large"
        variant="contained"
        onClick={() => {
          shuffle();
        }}
      >
        <ShuffleIcon />
        START!
      </Button>

      <Button
        fullWidth
        color="primary"
        size="large"
        variant="contained"
        onClick={() => {
          resetHandler();
        }}
      >
        <RestartAltIcon />
        Reset
      </Button>

      {menuHidden ? null : deleteValidation}
    </div>
  );
};

export default ShuffleHandler;
