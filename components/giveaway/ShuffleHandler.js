import React from "react";
import styles from "../../styles/giveaway.module.css";

const ShuffleHandler = ({
  selector,
  setShuffle,
  setVideoHidden,
  setDescriptorSelector,
  setWinner,
  arrays,
  timer,
}) => {
  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const shuffleHandler = (i) => {
    const result = selector[Math.floor(Math.random() * selector.length)];
    i === "reset" ? setShuffle([]) : setShuffle(result);
  };
  return (
    <div className={styles.shuffleContainer}>
      <span>
        <button
          onClick={async () => {
            if (Object.keys(arrays).length && selector) {
              setVideoHidden(false);
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
              setWinner(true);
              setTimeout(() => {
                setVideoHidden(true);
              }, 18000);
            }
          }}
        >
          Shuffle
        </button>
      </span>
      <span>
        <button
          onClick={() => {
            // router.reload(window.location.pathname);
            setDescriptorSelector("");
            shuffleHandler("reset");
            setWinner(false);
            setVideoHidden(true);
          }}
        >
          Reset
        </button>
      </span>
    </div>
  );
};

export default ShuffleHandler;
