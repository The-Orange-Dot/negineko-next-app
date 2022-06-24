import React, { useState } from "react";
import styles from "../../styles/modControls.module.css";
import MobileRaffleControlPanel from "./MobileRaffleControlPanel";
import MobileTextControlPanel from "./MobileTextControlPanel";
import MobileChatPanel from "./MobileChatPanel";

const MobileControlPanel = () => {
  const [toolSelected, setToolSelected] = useState("chat");
  const [tools, setTools] = useState(<MobileChatPanel />);

  const selectorHandler = (tab: string) => {
    if (tab === "raffle") {
      setToolSelected("raffle");
      setTools(<MobileRaffleControlPanel />);
    } else if (tab === "text-controls") {
      setToolSelected("text-controls");
      setTools(<MobileTextControlPanel />);
    } else if (tab === "chat") {
      setToolSelected("chat");
      setTools(<MobileChatPanel />);
    }
  };
  return (
    <div className={styles.mobileControlsContainer}>
      <div className={styles.mobileToolsSelectorContainer}>
        <span
          className={
            toolSelected === "chat"
              ? styles.mobileSelectedTab
              : styles.mobileSelectorTab
          }
          onClick={() => {
            selectorHandler("chat");
          }}
        >
          <p>Chat</p>
        </span>
        <span
          className={
            toolSelected === "raffle"
              ? styles.mobileSelectedTab
              : styles.mobileSelectorTab
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
              ? styles.mobileSelectedTab
              : styles.mobileSelectorTab
          }
          onClick={() => {
            selectorHandler("text-controls");
          }}
        >
          <p>Text Overlay</p>
        </span>
      </div>
      <div className={styles.mobileControls}>{tools}</div>
    </div>
  );
};

export default MobileControlPanel;
