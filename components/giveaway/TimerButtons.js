import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const TimerButtons = ({ setTimer }) => {
  const [timerSelected, setTimerSelected] = useState("30");
  const socket = useSelector((state) => state.socket.value.socket);
  const session = useSession();
  const mods = session.data.mods;
  const modFor = session.data.modFor;

  useEffect(() => {
    socket?.on("res-timer", (resTimer, selector) => {
      setTimer(resTimer);
      setTimerSelected(selector);
    });
  }, [setTimer, setTimerSelected, socket]);

  return (
    <>
      <p style={{ lineHeight: 0 }}>timers</p>
      <div>
        <span>
          <button
            className={
              timerSelected === "45" ? styles.selectedTimer : styles.button
            }
            name="45"
            onClick={() => {
              setTimer([750, 250, 95, 25]);
              setTimerSelected("45");
              socket?.emit("req-timer", [750, 250, 95, 25], "45", [
                ...mods,
                ...modFor,
              ]);
            }}
          >
            45 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === "30" ? styles.selectedTimer : styles.button
            }
            name="30"
            onClick={() => {
              setTimer([400, 120, 60, 20]);
              setTimerSelected("30");
              socket?.emit("req-timer", [400, 120, 60, 20], "30", [
                ...mods,
                ...modFor,
              ]);
            }}
          >
            30 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === "15" ? styles.selectedTimer : styles.button
            }
            name="15"
            onClick={() => {
              setTimer([200, 60, 30, 10]);
              setTimerSelected("15");
              socket?.emit("req-timer", [200, 60, 30, 10], "15", [
                ...mods,
                ...modFor,
              ]);
            }}
          >
            15 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === "10" ? styles.selectedTimer : styles.button
            }
            name="10"
            onClick={() => {
              setTimer([150, 40, 20, 6]);
              setTimerSelected("10");
              socket?.emit("req-timer", [150, 40, 20, 6], "10", [
                ...mods,
                ...modFor,
              ]);
            }}
          >
            10 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === "5" ? styles.selectedTimer : styles.button
            }
            name="5"
            onClick={() => {
              setTimer([65, 15, 7, 5]);
              setTimerSelected("5");
              socket?.emit("req-timer", [65, 15, 7, 5], "5", [
                ...mods,
                ...modFor,
              ]);
            }}
          >
            5 sec
          </button>
        </span>
        <span>
          <button
            className={
              timerSelected === "off" ? styles.selectedTimer : styles.button
            }
            name="off"
            onClick={() => {
              setTimer([0, 0, 0, 0]);
              setTimerSelected("off");
              socket?.emit("req-timer", [0, 0, 0, 0], "off", [
                ...mods,
                ...modFor,
              ]);
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
