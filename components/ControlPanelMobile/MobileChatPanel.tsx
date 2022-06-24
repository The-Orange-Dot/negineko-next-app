import React, { useEffect, useState } from "react";
import { TwitchChat, TwitchEmbed } from "react-twitch-embed";
import { useSession } from "next-auth/react";
import styles from "../../styles/botReference.module.css";
import StreamElementsReferences from "./BotReferences/StreamElementsReferences";
import HomeReferencePage from "./BotReferences/HomeReferencePage";
import NightbotReferencePage from "./BotReferences/NightbotReferencePage";
import TwitchReferences from "./BotReferences/TwitchReferencePage";
import StreamlabsReferencePage from "./BotReferences/StreamLabsReferencePage";

const MobileChatPanel = () => {
  const session = useSession();
  const isMod = session.data.mod;
  const modFor = session.data.modFor;
  const isStreamer = session.data.streamer;
  const streamerName = session.data.name;
  const [streamer, setStreamer] = useState(streamerName);
  const [botSelected, setBotSelected] = useState("home");
  const [botReference, setBotReference] = useState(<HomeReferencePage />);
  useEffect(
    () => {
      if (isStreamer) {
        setStreamer(streamerName);
      } else if (isMod) {
        setStreamer(modFor);
      }

      if (botSelected === "stream-elements") {
        setBotReference(<StreamElementsReferences />);
      } else if (botSelected === "nightbot") {
        setBotReference(<NightbotReferencePage />);
      } else if (botSelected === "twitch") {
        setBotReference(<TwitchReferences />);
      } else if (botSelected === "streamlabs") {
        setBotReference(<StreamlabsReferencePage />);
      } else {
        setBotReference(<HomeReferencePage />);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [isStreamer, botSelected]
  );

  return (
    <div>
      <TwitchChat
        channel={streamer}
        theme="light"
        width="100%"
        height="450px"
      />
      <h3> Command Reference for Bots</h3>
      <div className={styles.botSelectorTabsContainer}>
        <span
          className={
            botSelected === "twitch"
              ? styles.botSelectorTabSelected
              : styles.botSelectorTab
          }
          onClick={() => {
            setBotSelected("twitch");
          }}
        >
          <p>Twitch</p>
        </span>

        <span
          className={
            botSelected === "stream-elements"
              ? styles.botSelectorTabSelected
              : styles.botSelectorTab
          }
          onClick={() => {
            setBotSelected("stream-elements");
          }}
        >
          <p>Stream Elements</p>
        </span>
        <span
          className={
            botSelected === "nightbot"
              ? styles.botSelectorTabSelected
              : styles.botSelectorTab
          }
          onClick={() => {
            setBotSelected("nightbot");
          }}
        >
          <p>NightBot</p>
        </span>
        <span
          className={
            botSelected === "streamlabs"
              ? styles.botSelectorTabSelected
              : styles.botSelectorTab
          }
          onClick={() => {
            setBotSelected("streamlabs");
          }}
        >
          <p>StreamLabs</p>
        </span>
      </div>
      <div className={styles.botReferencePanelContainer}>{botReference}</div>
    </div>
  );
};

export default MobileChatPanel;
