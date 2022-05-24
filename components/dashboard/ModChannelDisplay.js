import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/dashboard.module.css";

const ModChannelDisplay = ({
  joinChannel,
  roomStatus,
  streamerChannels,
  mods,
  user,
}) => {
  const [streamers, setStreamers] = useState(user.modFor[0]);

  let streamer;
  if (streamers !== "") {
    streamer = (
      <div className={styles.streamerContainer}>
        <h5>Streamer Channels</h5>
        <div className={styles.streamerRoom}>
          {streamers}
          <button
            onClick={() => joinChannel()}
            className={styles.modStatusOpenButton}
          >
            Connect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statusContainer}>
      {user.mod ? streamer : null}

      <div className={styles.modStatusContainer}>
        <h5 className={styles.modStatusHeader}>Mod Channel</h5>
        <p className={styles.modStatus}>Status: {roomStatus}</p>
        {roomStatus === "open" ? (
          <button
            className={styles.modStatusOpenButton}
            onClick={() => streamerChannels("open-channel")}
          >
            Close Channel
          </button>
        ) : user?.modfor?.length ? (
          <button
            className={styles.modStatusOpenButton}
            onClick={() => streamerChannels("close-channel")}
          >
            Open Channel
          </button>
        ) : null}
        {mods}
      </div>
    </div>
  );
};

export default ModChannelDisplay;
