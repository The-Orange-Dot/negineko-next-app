import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { deleteButton } from "../../redux/actions/giveawaySlice";

const ShuffleHandler = ({
  usersArray,
  setShuffle,
  setDescriptorSelector,
  setWinner,
  timer,
  setUsersArray,
  setSelectedKey,
}) => {
  const dispatch = useDispatch();
  const raffleButtons = useSelector((state) => state.giveaway.buttons);
  const selectedButton = useSelector((state) => state.giveaway.selected);
  const socket = useSelector((state) => state.socket.value.socket);
  const session = useSession();
  const room = session?.data?.modFor;
  const mods = session?.data?.mods;

  useEffect(
    () => {
      socket?.on("res-shuffle", () => {
        shufflePressed();
        console.log(usersArray);
      });

      socket?.on("res-reset", () => {
        setDescriptorSelector("");
        shuffleHandler("reset");
        setWinner(false);
      });
    }, //eslint-disable-next-line react-hooks/exhaustive-deps
    [socket]
  );

  const shufflePressed = async () => {
    console.log("shuffling");
    if (raffleButtons) {
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
      setTimeout(() => {}, 18000);
    }
  };

  const shuffleHandler = (i) => {
    const result = usersArray[Math.floor(Math.random() * usersArray.length)];
    i === "reset" ? setShuffle([]) : setShuffle(result);
  };

  //Timer for shuffle
  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const deleteHandler = () => {
    const updatedButtons = raffleButtons.filter((button) => {
      return button.buttonName !== selectedButton.buttonName;
    });

    setDescriptorSelector("");
    setUsersArray("");
    setSelectedKey("");

    dispatch(deleteButton(updatedButtons));

    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "delete-button",
        mods: [...mods, ...room],
        button: updatedButtons,
      }),
    });
  };

  return (
    <div className={styles.shuffleContainer}>
      <span>
        <button
          onClick={() => {
            socket?.emit("shuffle", [...room, ...mods]);
            shufflePressed();
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
