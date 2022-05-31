import React from "react";
import styles from "../../styles/modControls.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { TwitchEmbed } from "react-twitch-embed";
import { useEffect, useState } from "react";
import RaffleControlPanel from "../ControlPanel/RaffleControlPanel";

const ModControls = () => {
  const [streamer, setStreamer] = useState(streamerName);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [toolSelected, setToolSelected] = useState("raffle");
  const session = useSession();
  const modFor = session?.data?.modFor;
  const isMod = session.data.mod;
  const streamerName = session.data.name;
  const isStreamer = session.data.streamer;

  useEffect(
    () => {
      if (isStreamer) {
        setStreamer(streamerName);
      } else if (isMod) {
        setStreamer(modFor);
      }

      setPageLoaded(true);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [streamer]
  );

  let tools;
  switch (toolSelected) {
    // case "raffle":
    //   tools = <RaffleControlPanel />;
    default:
      tools = <RaffleControlPanel />;
  }

  return (
    <div className={styles.modControlsPageContainer}>
      <div className={styles.videoPlayerContainer}>
        {streamer ? (
          <TwitchEmbed
            channel={streamer}
            id={streamer}
            theme="dark"
            muted
            width="100%"
            height="100%"
            className={styles.multiEmbed}
          />
        ) : null}
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.toolsSelectorContainer}>
          <span
            className={
              toolSelected === "raffle"
                ? styles.selectedTab
                : styles.selectorTab
            }
          >
            <p
              onClick={() => {
                setToolSelected("raffle");
              }}
            >
              Raffle
            </p>
          </span>
        </div>
        <div className={styles.controls}>{tools}</div>
      </div>
    </div>
  );
};

export default ModControls;
