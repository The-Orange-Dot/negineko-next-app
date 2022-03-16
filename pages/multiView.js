import React, { useState } from "react";
import styles from "../styles/multiView.module.css";
// import ReactTwitchEmbedVideo from "react-twitch-embed-video";

const MultiView = () => {
  const [streamers, setStreamers] = useState(["negineko_tokyo"]);
  const [userInput, setUserInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  const videoFeed = streamers.map((streamer) => {
    return (
      <div key={streamer} className={styles.streamerContainer}>
        <div className={styles.videoFeed}>
          <div>
            <div className={styles.streamHeader}>
              <h3>{streamer}</h3>
              <p
                value={streamer}
                onClick={() => {
                  closeFeed(streamer);
                }}
                className={styles.closeButton}
              >
                X
              </p>
            </div>
          </div>
          <iframe
            src={`https://player.twitch.tv/?channel=${streamer}&parent=localhost&muted=true`}
            height="405"
            width="720"
            allowFullScreen="true"
            border="0"
            className={styles.iframe}
          ></iframe>
          <iframe
            src={`https://www.twitch.tv/embed/${streamer}/chat?parent=localhost`}
            height="400"
            width="720"
            className={styles.iframe}
          ></iframe>
        </div>
      </div>
    );
  });

  const addVideoFeed = (e) => {
    e.preventDefault();
    setStreamers([...streamers, userInput]);
    setUserInput("");
  };

  const closeFeed = (e) => {
    const filtered = streamers.filter((streamer) => {
      return streamer !== e;
    });
    setStreamers(filtered);
  };

  return (
    <div className={styles.twitchContainer}>
      <form action="" onSubmit={(e) => addVideoFeed(e)}>
        <input
          type="text"
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Streamer name"
        />
        <input type="submit" />
      </form>
      <div className={styles.videoContainer}>{videoFeed}</div>
    </div>
  );
};

export default MultiView;
