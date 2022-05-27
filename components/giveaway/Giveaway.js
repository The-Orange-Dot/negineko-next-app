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
  const raffleButtons = useSelector((state) => state.giveaway.buttons);
  const socket = useSelector((state) => state.socket.value.socket);
  const router = useRouter();
  const session = useSession();
  const [usersArray, setUsersArray] = useState("");
  const [descriptorSelector, setDescriptorSelector] = useState("");
  const [winner, setWinner] = useState(false);
  const [shuffle, setShuffle] = useState("");
  const [timer, setTimer] = useState([400, 120, 60, 20]);
  const [selectedKey, setSelectedKey] = useState("");
  // TEXT-COLOR-OPTIONS
  const [textColor, setTextColor] = useState("black");
  const textStyles = {
    color: textColor,
  };
  // SCREEN-AREA-OPTIONS
  const [screenColor, setScreenColor] = useState("none");
  const screenStyles = {
    width: "150%",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: screenColor === "none" ? "rgba(0,0,0,0)" : screenColor,
  };
  const mods = session.data.mods;
  const modFor = session.data.modFor;

  useEffect(
    () => {
      socket?.on("res-selected-button", (selected) => {
        selectorHandler(selected);
      });

      console.log("Raffle Page Loaded");
    }, //eslint-disable-next-line react-hooks/exhaustive-deps
    [socket]
  );

  const selectorHandler = (e) => {
    dispatch(selectButton(e));
    setDescriptorSelector(e.title);
    setUsersArray(e.users);
    setSelectedKey(e.buttonName);

    // socket.emit("req-select-button", e, [...mods, ...modFor]);
  };

  const keyButtons = raffleButtons?.map((button) => {
    return (
      <button
        key={`${button.title} ${button.buttonName}`}
        onClick={() => {
          selectorHandler(button);
        }}
        className={
          selectedKey === button.buttonName
            ? styles.selectedKeyButton
            : styles.keyButton
        }
      >
        {button.buttonName}
      </button>
    );
  });

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
          <div
            style={{ display: "flex", alignItems: "center", ...screenStyles }}
          >
            <span className={styles.screenDisplay}>
              <h1 style={textStyles}>{descriptorSelector}</h1>
              <div>
                {winner ? <h1 style={textStyles}>WINNER!</h1> : null}
                <h1 style={textStyles}>{shuffle}</h1>
              </div>
            </span>
          </div>

          <div className={styles.controlsContainer}>
            {/* ADD USERNAMES CONTAINER */}
            <div className={styles.formContainer}>
              <AddButtons />
            </div>

            {/* CATEGORY BUTTONS */}
            {keyButtons?.length > 0 ? (
              <div className={styles.keyButtons}>{keyButtons}</div>
            ) : (
              <div style={{ width: 300, textAlign: "center" }}>
                <p>Add a giveaway item on the left.</p>
                <p>(9 buttons max)</p>
              </div>
            )}

            {/* SHUFFLE AND RESET BUTTONS */}
            <div className={styles.controls}>
              <div style={{ margin: "10%" }}>
                <ShuffleHandler
                  usersArray={usersArray}
                  setShuffle={setShuffle}
                  setDescriptorSelector={setDescriptorSelector}
                  setWinner={setWinner}
                  timer={timer}
                  setUsersArray={setUsersArray}
                  setSelectedKey={setSelectedKey}
                />
              </div>
            </div>

            {/* TIMER BUTTONS */}
            <div className={styles.timerContainer}>
              <TimerButtons setTimer={setTimer} />
            </div>

            {/* OPTIONS SELECTORS */}
            <div className={styles.optionsContainer}>
              <Options
                setTextColor={setTextColor}
                textColor={textColor}
                screenColor={screenColor}
                setScreenColor={setScreenColor}
              />
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
