import styles from "../../styles/giveaway.module.css";
import { useEffect, useState } from "react";
import ShuffleHandler from "../../components/giveaway/ShuffleHandler";
import AddButtons from "../../components/giveaway/AddButtons";
import TimerButtons from "../../components/giveaway/TimerButtons";
import Options from "../../components/giveaway/Options";

export default function Home() {
  const [itemNameInput, setItemNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [selector, setSelector] = useState("");
  const [descriptorSelector, setDescriptorSelector] = useState("");
  const [winner, setWinner] = useState(false);
  const [shuffle, setShuffle] = useState("");
  const [videoHidden, setVideoHidden] = useState(false);
  const [keyButtons, setKeyButtons] = useState();
  const [arrays, setArrays] = useState({});
  const [descriptor, setDescriptor] = useState({});
  const [timer, setTimer] = useState([400, 120, 60, 20]);
  const [selectedKey, setSelectedKey] = useState("");
  // TEXT-COLOR-OPTIONS
  const [textColor, setTextColor] = useState("black");
  const textStyles = {
    color: textColor,
  };
  // SCREEN-AREA-OPTIONS
  const [screenColor, setScreenColor] = useState("white");
  const screenStyles = {
    width: "150%",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: screenColor,
  };

  useEffect(() => {
    console.log(arrays);

    const selectorHandler = (e) => {
      for (let key in arrays) {
        if (e === key) {
          setSelector(arrays[key]);
          setDescriptorSelector(descriptor[key]);
        }
      }
    };

    setKeyButtons(
      Object.keys(arrays).map((key) => {
        return (
          <button
            className={
              selectedKey === key ? styles.selectedKeyButton : styles.keyButton
            }
            key={key}
            onClick={() => {
              selectorHandler(key);
              setSelectedKey(key);
            }}
          >
            {key}
          </button>
        );
      })
    );
    console.log("Page Loaded");
  }, [arrays, selectedKey, descriptor]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ display: "flex", alignItems: "center", ...screenStyles }}>
          {/* {winner && !videoHidden ? (
            <video
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              className="winner-video"
            >
              <source src={"/images/confetti.mp4"} />
            </video>
          ) : null} */}
          {/* <span>
            {winner ? (
              <Image
                src={"/images/Nacchan.png"}
                alt="nacchan"
                width={400}
                height={400}
                style={{}}
              />
            ) : null}
          </span> */}
          <span className={styles.screenDisplay}>
            <h1 style={textStyles}>{descriptorSelector}</h1>
            <div>
              {winner ? <h1 style={textStyles}>WINNER!</h1> : null}
              <h1 style={textStyles}>{shuffle}</h1>
            </div>
          </span>
          {/* <span>
            {winner ? (
              <Image
                src={"/images/Mocchan.png"}
                alt="mocchan"
                width={400}
                height={400}
                style={{}}
              />
            ) : null}
          </span> */}
        </div>

        <div className={styles.controlsContainer}>
          {/* ADD USERNAMES CONTAINER */}
          <div className={styles.formContainer}>
            <AddButtons
              setItemNameInput={setItemNameInput}
              setDescriptionInput={setDescriptionInput}
              setUserInput={setUserInput}
              itemNameInput={itemNameInput}
              userInput={userInput}
              descriptionInput={descriptionInput}
              arrays={arrays}
              descriptor={descriptor}
              setArrays={setArrays}
              setDescriptor={setDescriptor}
            />
          </div>

          {/* CATEGORY BUTTONS */}
          {Object.keys(arrays).length ? (
            <div className={styles.keyButtons}>{keyButtons}</div>
          ) : (
            <div style={{ width: 400, textAlign: "center" }}>
              <p>Add a giveaway item on the left.</p>
              <p>(9 buttons max)</p>
              <p>Refreshing page will erase all buttons for now.</p>
            </div>
          )}

          {/* SHUFFLE AND RESET BUTTONS */}
          <div className={styles.controls}>
            <div style={{ margin: "10%" }}>
              <ShuffleHandler
                arrays={arrays}
                selector={selector}
                setShuffle={setShuffle}
                setVideoHidden={setVideoHidden}
                setDescriptorSelector={setDescriptorSelector}
                setWinner={setWinner}
                timer={timer}
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
}
