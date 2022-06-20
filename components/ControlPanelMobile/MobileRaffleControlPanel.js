import React, { useState } from "react";
import styles from "../../styles/modControls.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectButton,
  winnerSelected,
  winner,
  deleteButton,
} from "../../redux/actions/giveawaySlice";
import { useSession } from "next-auth/react";
import { ShufflePress } from "../giveaway/ShufflePress";
import TimerButtons from "../giveaway/TimerButtons";
import TextColor from "../giveaway/TextColor";
import ColorKey from "../giveaway/ColorKey";
import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const RaffleControlPanel = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const timer = useSelector((state) => state.giveaway.timer);
  const buttons = useSelector((state) => state.giveaway.buttons);
  const selectedButton = useSelector((state) => state.giveaway.selected);
  const mods = useSelector((state) => state.mods.mods);
  const [hideOverlay, setHideOverlay] = useState(false);
  const raffleButtons = useSelector((state) => state.giveaway.buttons);
  const connected = useSelector((state) => state.socket.connected);

  //Shuffles and sends shuffle command to websocket
  const shuffle = () => {
    if (selectedButton.users) {
      const result =
        selectedButton.users[
          Math.floor(Math.random() * selectedButton.users.length)
        ];

      ShufflePress(buttons, selectedButton.users, timer, dispatch, result);
      if (connected) {
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
    }
  };

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

  //Tracks which key you've pressed
  const selectorHandler = (e) => {
    dispatch(selectButton(e));
    if (connected) {
      fetch("/api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "selector-req",
          streamer: session.data.name,
          modFor: session.data.modFor,
          button: e,
        }),
      });
    }
  };

  //Maps all the buttons in the buttons panel
  const keyButtons = buttons?.map((button) => {
    return (
      <Button
        variant="contained"
        color="primary"
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
      </Button>
    );
  });

  const hideOverlayHandler = () => {
    setHideOverlay(!hideOverlay);
    if (connected) {
      fetch("api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-hide-menu",
          streamer: session.data.name,
          modFor: session.data.modFor,
          hideOverlay: hideOverlay,
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

  return (
    <div className={styles.mobileRafflePanelContainer}>
      <div className={styles.mobileRaffleButtonsContainer}>
        <ButtonGroup
          sx={{ marginTop: 5 }}
          orientation="vertical"
          fullWidth={true}
          variant="contained"
        >
          {keyButtons}
        </ButtonGroup>
      </div>
      <div className={styles.mobileRaffleShuffleContainer}>
        <Button
          fullWidth
          color="primary"
          size="large"
          variant="contained"
          onClick={() => {
            shuffle();
          }}
        >
          Shuffle
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
          Reset
        </Button>
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
      </div>

      <div className={styles.mobileRaffleTimersContainer}>
        <TimerButtons />
      </div>
      <p style={{ lineHeight: 0 }}>Options</p>

      <div className={styles.mobileRaffleOptionsContainer}>
        <TextColor />
        <ColorKey />
      </div>
      <Button
        onClick={() => {
          hideOverlayHandler();
        }}
      >
        Toggle Menu Opacity
      </Button>
    </div>
  );
};

export default RaffleControlPanel;
