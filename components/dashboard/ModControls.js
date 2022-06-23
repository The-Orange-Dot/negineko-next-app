import React from "react";
import styles from "../../styles/modControls.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { TwitchEmbed } from "react-twitch-embed";
import { useEffect, useState } from "react";
import ModControlPanel from "./ModControlPanel";
import { useMediaQuery } from "react-responsive";
import MobileControlPanel from "../ControlPanelMobile/MobileControlPanel";

const ModControls = () => {
  const [streamer, setStreamer] = useState(streamerName);
  const [pageLoaded, setPageLoaded] = useState(false);
  const session = useSession();
  const modFor = session.data.modFor;
  const isMod = session.data.mod;
  const streamerName = session.data.name;
  const isStreamer = session.data.streamer;
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);

  useEffect(
    () => {
      isMobile ? setMobile(true) : setMobile(false);

      if (isStreamer) {
        setStreamer(streamerName);
      } else if (isMod) {
        setStreamer(modFor);
      }

      setPageLoaded(true);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile]
  );

  return (
    <div
      className={
        mobile
          ? styles.mobileModControlsPageContainer
          : styles.modControlsPageContainer
      }
    >
      <div
        className={
          mobile
            ? styles.mobileVideoPlayerContainer
            : styles.videoPlayerContainer
        }
      >
        {streamer ? (
          <TwitchEmbed
            channel={streamer}
            id={streamer}
            theme="dark"
            withChat={isMobile ? false : true}
            muted
            width="100%"
            height={mobile ? 250 : "100%"}
            className={styles.videoPlayerContainer}
          />
        ) : null}
      </div>
      {isMobile ? <MobileControlPanel /> : <ModControlPanel />}
    </div>
  );
};

export default ModControls;
