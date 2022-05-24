import React from "react";
import { useState } from "react";
import styles from "../../styles/dashboard.module.css";

const ModChannelDisplay = ({ roomStatus }) => {
  const [streamers, setStreamers] = useState("NegiNekoTokyo");

  let streamer;
  if (streamers !== "") {
    streamer = (
      <div className={styles.streamerContainer}>
        <h5>Streamer Channels</h5>
        <div className={styles.streamerRoom}>
          {streamers}
          <button className={styles.modStatusOpenButton}>Connect</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statusContainer}>
      {streamer}

      <div className={styles.modStatusContainer}>
        <h5 className={styles.modStatusHeader}>Mod Channel</h5>
        <p className={styles.modStatus}>Status: {roomStatus}</p>
        <button className={styles.modStatusOpenButton}>Open Channel</button>
      </div>
    </div>
  );
};

export default ModChannelDisplay;
