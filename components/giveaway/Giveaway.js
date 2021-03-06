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
import { ButtonGroup, Button, Paper, Box } from "@mui/material";
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
  const [menuHidden, setMenuHidden] = useState(false);
  const connected = useSelector((state) => state.socket.connected);

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
    if (connected) {
      fetch("/api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          streamer: session.data.name,
          modFor: session.data.modFor,
          emit: "sync-buttons-req",
          requester: requester,
        }),
      });
    }
  };

  if (session.status === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (session.status === "authenticated") {
    return !menuHidden ? (
      <Box
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
              <ButtonGroup orientation="vertical" fullWidth variant="contained">
                {keyButtons}
              </ButtonGroup>
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
              <Button
                onClick={() => {
                  syncButtonsHandler();
                }}
              >
                Sync buttons
              </Button>
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
          <Button
            onClick={() => {
              setMenuHidden(true);
            }}
          >
            Condense Menu
          </Button>
        </div>
      </Box>
    ) : (
      <Box className={styles.miniControlsContainer}>
        <div style={{ width: "60%" }}>
          <ButtonGroup variant="contained">{keyButtons}</ButtonGroup>
        </div>
        <div style={{ width: "40%", display: "flex" }}>
          <ShuffleHandler menuHidden={menuHidden} />
          <Button
            className={styles.openMenuButton}
            size="small"
            onClick={() => {
              setMenuHidden(false);
            }}
          >
            Open Menu
          </Button>
        </div>
      </Box>
    );
  } else if (session.status === "unauthenticated") {
    console.log("Unauthorized");
    router.push("/auth/signin");
  }
}
