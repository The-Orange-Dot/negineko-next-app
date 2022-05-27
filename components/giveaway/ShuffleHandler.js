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
  selectedKey,
  setDeletedUpdate,
  descriptor,
}) => {
  const socket = useSelector((state) => state.socket.value.socket);
  const [shuffleState, setShuffleState] = useState();
  const session = useSession();
  const room = session?.data?.modFor;
  const mods = session?.data?.mods;

  useEffect(
    () => {
      socket?.on("res-shuffle", () => {
        shufflePressed();
        console.log(selector);
      });

      socket?.on("res-delete-button", (key) => {
        delete arrays[key];
        setDeletedUpdate(true);

        localStorage.setItem("arrays", JSON.stringify(arrays));
        localStorage.setItem("descriptions", JSON.stringify(descriptor));
      });

      socket?.on("res-reset", () => {
        setDescriptorSelector("");
        shuffleHandler("reset");
        setWinner(false);
        setVideoHidden(true);
      });
    }, //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const shuffleHandler = (i) => {
    const result = selector[Math.floor(Math.random() * selector.length)];
    i === "reset" ? setShuffle([]) : setShuffle(result);
  };

  const shufflePressed = async () => {
    console.log("shuffling");
    if (Object.keys(arrays).length || selector) {
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

  const deleteHandler = () => {
    const foundKey = Object.keys(arrays).filter((findKey) => {
      return findKey === selectedKey;
    });

    delete arrays[foundKey];

    setDeletedUpdate(true);

    localStorage.setItem("arrays", JSON.stringify(arrays));
    localStorage.setItem("descriptions", JSON.stringify(descriptor));

    socket?.emit("req-delete-button", foundKey, [...mods, ...room]);
  };

  return (
    <div className={styles.shuffleContainer}>
      <span>
        <button
          onClick={() => {
            socket?.emit("shuffle", [...room, ...mods]);
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

            socket?.emit("req-reset", [...mods, ...room]);
          }}
        >
          Reset
        </button>
      </span>
      <span>
        <button
          onClick={() => {
            deleteHandler();
          }}
        >
          Delete Selected
        </button>
      </span>
    </div>
  );
};

export default ShuffleHandler;
