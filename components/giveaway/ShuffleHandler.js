import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const ShuffleHandler = ({
  selector,
  setShuffle,
  setVideoHidden,
  setDescriptorSelector,
  setWinner,
  arrays,
  timer,
}) => {
  const socket = useSelector((state) => state.socket.value.socket);
  const [shuffleState, setShuffleState] = useState();
  const session = useSession();
  const room = session?.data?.modFor[0];
  const mods = session?.data?.mods;

  useEffect(() => {
    socket?.on("shuffle-res", () => {
      shufflePressed();
    });

    socket?.on("res-reset", () => {
      setDescriptorSelector("");
      shuffleHandler("reset");
      setWinner(false);
      setVideoHidden(true);
    });
  }, [socket, timer, setWinner, selector, arrays, setShuffle, setVideoHidden]);

  const shuffleHandler = (i) => {
    const result = selector[Math.floor(Math.random() * selector.length)];
    i === "reset" ? setShuffle([]) : setShuffle(result);
  };

  const shufflePressed = async () => {
    console.log("shuffling");
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
  };

  const shuffle = () => {
    shufflePressed();
  };

  //Timer for shuffle
  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  return (
    <div className={styles.shuffleContainer}>
      <span>
        <button
          onClick={() => {
            socket?.emit("shuffle", room, "TEST");
            shuffle();
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

            socket?.emit("req-reset", [...mods, room]);
          }}
        >
          Reset
        </button>
      </span>
    </div>
  );
};

export default ShuffleHandler;
