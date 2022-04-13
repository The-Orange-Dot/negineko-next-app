import React, { useState } from "react";
import styles from "../../styles/giveaway.module.css";

const TimerButtons = ({ setTimer }) => {
  const [timerSelected, setTimerSelected] = useState("30");

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
