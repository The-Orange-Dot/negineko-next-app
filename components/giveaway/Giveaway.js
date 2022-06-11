import styles from "../../styles/giveaway.module.css";
import { useState } from "react";
import ShuffleHandler from "./ShuffleHandler";
import AddButtons from "./AddButtons";
import TimerButtons from "./TimerButtons";
import TextColor from "./TextColor";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { selectButton } from "../../redux/actions/giveawaySlice";
import { ButtonGroup, Button, ThemeProvider, Paper } from "@mui/material";
import { colorTheme } from "../MuiColorThemes";
import ColorKey from "./ColorKey";

export default function Giveaway() {
  const dispatch = useDispatch();
  const hide = useSelector((state) => state.hideMenu.value);
  const raffleButtons = useSelector((state) => state.giveaway.buttons);
  const selectedButton = useSelector((state) => state.giveaway.selected);
  const router = useRouter();
  const session = useSession();
  const connection = useSelector((state) => state.socket.connected);
  const [timer, setTimer] = useState([400, 120, 60, 20]);
  const mods = useSelector((state) => state);

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

  //List of all created Buttons
  const keyButtons = raffleButtons?.map((button) => {
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

  //Fetches buttons from all other connected users
  const syncButtonsHandler = () => {
    const requester = session.data.name;
    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        streamer: session.data.name,
        modFor: session.data.modFor,
        emit: "sync-buttons-req",
        requester: requester,
      }),
    });
  };

  if (session.status === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (session.status === "authenticated") {
    return (
      <Paper
        className={styles.controlsContainer}
        elevation={2}
        variant="elevation"
      >
        {/* ADD USERNAMES CONTAINER */}
        <div
          className={styles.formContainer}
          style={hide ? { opacity: 0 } : { opacity: 1 }}
        >
          <AddButtons />
        </div>

        {/* CATEGORY BUTTONS */}
        <div
          className={styles.buttonsContainer}
          style={hide ? { opacity: 0 } : { opacity: 1 }}
        >
          {keyButtons?.length > 0 ? (
            <div className={styles.keyButtons}>
              <ThemeProvider theme={colorTheme}>
                <ButtonGroup
                  orientation="vertical"
                  fullWidth={true}
                  variant="contained"
                >
                  {keyButtons}
                </ButtonGroup>
              </ThemeProvider>
            </div>
          ) : (
            <Paper className={styles.emptyKeyButtons} variant="none">
              <p>Add a giveaway item on the left.</p>
              <p>(9 buttons max)</p>
            </Paper>
          )}
          {connection ? (
            <div
              className={styles.connectedButtons}
              style={hide ? { opacity: 0 } : { opacity: 1 }}
            >
              <button
                onClick={() => {
                  syncButtonsHandler();
                }}
              >
                Sync buttons
              </button>
            </div>
          ) : null}
        </div>

        {/* SHUFFLE AND RESET BUTTONS */}
        <div
          className={styles.controls}
          style={hide ? { opacity: 0 } : { opacity: 1 }}
        >
          <ShuffleHandler timer={timer} />
        </div>

        {/* TIMER BUTTONS */}
        <div
          className={styles.timerContainer}
          style={hide ? { opacity: 0 } : { opacity: 1 }}
        >
          <TimerButtons setTimer={setTimer} />
        </div>

        {/* OPTIONS SELECTORS */}
        <div
          className={styles.optionsContainer}
          style={hide ? { opacity: 0 } : { opacity: 1 }}
        >
          <TextColor />
          <ColorKey />
        </div>
      </Paper>
    );
  } else if (session.status === "unauthenticated") {
    console.log("Unauthorized");
    router.push("/auth/signin");
  }
}
