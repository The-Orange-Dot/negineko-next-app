import React, { useState } from "react";
import styles from "../../styles/modControls.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectButton,
  winnerSelected,
  winner,
} from "../../redux/actions/giveawaySlice";
import { useSession } from "next-auth/react";
import { ShufflePress } from "../giveaway/ShufflePress";
import TimerButtons from "../giveaway/TimerButtons";
import TextColor from "../giveaway/TextColor";
import ColorKey from "../giveaway/ColorKey";

const RaffleControlPanel = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const timer = useSelector((state) => state.giveaway.timer);
  const buttons = useSelector((state) => state.giveaway.buttons);
  const selectedButton = useSelector((state) => state.giveaway.selected);
  const mods = useSelector((state) => state.mods.mods);
  const [hideOverlay, setHideOverlay] = useState(false);

  //Shuffles and sends shuffle command to websocket
  const shuffle = () => {
    if (selectedButton.users) {
      const result =
        selectedButton.users[
          Math.floor(Math.random() * selectedButton.users.length)
        ];

      ShufflePress(buttons, selectedButton.users, timer, dispatch, result);
      fetch("api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-shuffle",
          streamer: session.data.name,
          modFor: session.data.modFor,
          body: JSON.stringify({
            timer: timer,
            selectedButton: selectedButton.users,
            winnerName: result,
          }),
        }),
      });
    }
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
        streamer: session.data.name,
        modFor: session.data.modFor,
      }),
    });
  };

  //Tracks which key you've pressed
  const selectorHandler = (e) => {
    dispatch(selectButton(e));
    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "selector-req",
        streamer: session.data.name,
        modFor: session.data.modFor,
        button: e,
      }),
    });
  };

  //Maps all the buttons in the buttons panel
  const keyButtons = buttons?.map((button) => {
    return (
      <button
        key={`${button.title} ${button.buttonName}`}
        onClick={() => {
          selectorHandler(button);
        }}
        className={
          selectedButton.buttonName === button.buttonName
            ? styles.selectedKeyButton
            : styles.keyButton
        }
      >
        {button.buttonName}
      </button>
    );
  });

  const hideOverlayHandler = () => {
    setHideOverlay(!hideOverlay);

    console.log(hideOverlay);

    fetch("api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "req-hide-menu",
        streamer: session.data.name,
        modFor: session.data.modFor,
        hideOverlay: hideOverlay,
      }),
    });
  };

  return (
    <div className={styles.rafflePanelContainer}>
      <div className={styles.raffleButtonsContainer}>{keyButtons}</div>
      <div className={styles.raffleShuffleContainer}>
        <button
          onClick={() => {
            shuffle();
          }}
        >
          Shuffle
        </button>
        <button
          onClick={() => {
            resetHandler();
          }}
        >
          Reset
        </button>
      </div>
      <div className={styles.raffleTimersContainer}>
        <TimerButtons />
      </div>
      <div className={styles.raffleOptionsContainer}>
        <TextColor />
        <ColorKey />
        <div>
          <button
            onClick={() => {
              hideOverlayHandler();
            }}
          >
            Toggle Menu Opacity
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaffleControlPanel;
