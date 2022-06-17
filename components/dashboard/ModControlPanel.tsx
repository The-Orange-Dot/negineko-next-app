import React, { useState } from "react";
import styles from "../../styles/modControls.module.css";
import RaffleControlPanel from "../ControlPanel/RaffleControlPanel";
import TextControlPanel from "../ControlPanel/TextControlPanel";

const ModControlPanel = () => {
  const [toolSelected, setToolSelected] = useState("raffle");
  const [tools, setTools] = useState(<RaffleControlPanel />);

  const selectorHandler = (tab: string) => {
    if (tab === "raffle") {
      setToolSelected("raffle");
      setTools(<RaffleControlPanel />);
    } else if (tab === "text-controls") {
      setToolSelected("text-controls");
      setTools(<TextControlPanel />);
    }
  };

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.toolsSelectorContainer}>
        <span
          className={
            toolSelected === "raffle" ? styles.selectedTab : styles.selectorTab
          }
          onClick={() => {
            selectorHandler("raffle");
          }}
        >
          <p>Raffle</p>
        </span>
        <span
          className={
            toolSelected === "text-controls"
              ? styles.selectedTab
              : styles.selectorTab
          }
          onClick={() => {
            selectorHandler("text-controls");
          }}
        >
          <p>Text Overlay</p>
        </span>
      </div>
      <div className={styles.controls}>{tools}</div>
    </div>
  );
};

export default ModControlPanel;
