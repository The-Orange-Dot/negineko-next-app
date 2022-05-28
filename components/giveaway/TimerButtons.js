import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { selectTimer } from "../../redux/actions/giveawaySlice";

const TimerButtons = () => {
  const dispatch = useDispatch();
  // const [timerSelected, setTimerSelected] = useState("30");
  const session = useSession();
  const mods = [...session.data.mods, ...session.data.modFor];
  const timerSelected = useSelector((state) => state.giveaway.timerSelected);
  const timerArray = useSelector((state) => state.giveaway.timer);

  const timeSelectionHandler = (timerSelected, timer) => {
    dispatch(selectTimer({ timerSelected: timerSelected, timer: timer }));

    fetch("api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "req-timer-selection",
        mods: mods,
        body: { timer: timerArray, timerSelected: timerSelected },
      }),
    });
  };

  return (
    <>
      <p style={{ lineHeight: 0 }}>timers</p>
      <div className={styles.timers}>
        <span>
          <button
            className={
              timerSelected === 45 ? styles.selectedTimer : styles.button
            }
            name="45"
            onClick={() => {
              timeSelectionHandler(45, [750, 250, 95, 25]);
            }}
          >
            45 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === 30 ? styles.selectedTimer : styles.button
            }
            name="30"
            onClick={() => {
              timeSelectionHandler(30, [400, 120, 60, 20]);
            }}
          >
            30 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === 15 ? styles.selectedTimer : styles.button
            }
            name="15"
            onClick={() => {
              timeSelectionHandler(15, [200, 60, 30, 10]);
            }}
          >
            15 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === 10 ? styles.selectedTimer : styles.button
            }
            name="10"
            onClick={() => {
              timeSelectionHandler(10, [150, 40, 20, 6]);
            }}
          >
            10 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === 5 ? styles.selectedTimer : styles.button
            }
            name="5"
            onClick={() => {
              timeSelectionHandler(5, [65, 15, 7, 5]);
            }}
          >
            5 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === 0 ? styles.selectedTimer : styles.button
            }
            name="off"
            onClick={() => {
              timeSelectionHandler(0, [0, 0, 0, 0]);
            }}
          >
            Off
          </button>
        </span>
      </div>
    </>
  );
};

export default TimerButtons;
