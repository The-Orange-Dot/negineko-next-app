import React from "react";
import styles from "../../styles/modControls.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { TwitchEmbed } from "react-twitch-embed";
import { useEffect, useState } from "react";
import ModControlPanel from "./ModControlPanel";

const ModControls = () => {
  const [streamer, setStreamer] = useState(streamerName);
  const [pageLoaded, setPageLoaded] = useState(false);
  const session = useSession();
  const modFor = session.data.modFor;
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
    []
  );

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
      <ModControlPanel />
    </div>
  );
};

export default ModControls;
