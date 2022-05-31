import styles from "../../styles/giveaway.module.css";
import { useEffect, useState } from "react";
import ShuffleHandler from "./ShuffleHandler";
import AddButtons from "./AddButtons";
import TimerButtons from "./TimerButtons";
import Options from "./Options";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { selectButton } from "../../redux/actions/giveawaySlice";

export default function Giveaway() {
  const dispatch = useDispatch();
  const textColor = useSelector((state) => state.giveaway.textColor);
  const screenColor = useSelector((state) => state.giveaway.screenColor);
  const hide = useSelector((state) => state.hideMenu.value);
  const raffleButtons = useSelector((state) => state.giveaway.buttons);
  const selectedButton = useSelector((state) => state.giveaway.selected);
  const winner = useSelector((state) => state.giveaway.winner);
  const selectedWinner = useSelector((state) => state.giveaway.winnerSelected);
  const router = useRouter();
  const session = useSession();
  const connection = useSelector((state) => state.socket.connected);
  const [timer, setTimer] = useState([400, 120, 60, 20]);
  // TEXT-COLOR-OPTIONS
  const textStyles = {
    color: textColor,
    transition: "0.3s",
  };
  // SCREEN-AREA-OPTIONS
  const screenStyles = {
    backgroundColor: screenColor === "none" ? "rgba(0,0,0,0)" : screenColor,
  };
  const mods = useSelector((store) => store.mods);

  //Tracks which key you've pressed
  const selectorHandler = (e) => {
    dispatch(selectButton(e));
    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "selector-req",
        mods: [...mods, session.data.modFor],
        button: e,
      }),
    });
  };

  //List of all created Buttons
  const keyButtons = raffleButtons?.map((button) => {
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

  //Fetches buttons from all other connected users
  const syncButtonsHandler = () => {
    const requester = session.data.name;
    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        mods: [...mods, session.data.modFor],
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
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.colorKey} style={{ ...screenStyles }} />
          <div className={styles.giveawayStyles}>
            <span className={styles.screenDisplay}>
              <h1 style={textStyles}>{selectedButton.title}</h1>
              <div>
                {selectedWinner ? <h1 style={textStyles}>WINNER!</h1> : null}
                <h1 style={textStyles}>{winner}</h1>
              </div>
            </span>
          </div>
          <div className={styles.controlsContainer}>
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
                <div className={styles.keyButtons}>{keyButtons}</div>
              ) : (
                <div className={styles.emptyKeyButtons}>
                  <p>Add a giveaway item on the left.</p>
                  <p>(9 buttons max)</p>
                </div>
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
              <div style={{ margin: "10%" }}>
                <ShuffleHandler timer={timer} />
              </div>
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
              <Options />
            </div>
          </div>
        </main>
      </div>
    );
  } else if (session.status === "unauthenticated") {
    console.log("Unauthorized");
    router.push("/auth/signin");
  }
}
