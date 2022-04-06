import React from "react";

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
    <>
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
    </>
  );
};

export default ShuffleHandler;
