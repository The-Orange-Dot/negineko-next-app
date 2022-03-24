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
            src={`https://player.twitch.tv/embed?channel=${streamer}&parent=localhost&parent=negineko-site.herokuapp.com/multiView&muted=true`}
            height="380"
            width="675"
            allowFullScreen={true}
            className={styles.iframe}
          ></iframe>
          <iframe
            src={`https://www.twitch.tv/embed/${streamer}/chat?parent=localhost&parent=negineko-site.herokuapp.com/multiView`}
            height="400"
            width="675"
            className={styles.iframe}
          ></iframe>
        </div>
      </div>
    );
  });

  const addVideoFeed = (e) => {
    e.preventDefault();
    if (streamers.includes(userInput)) {
      console.log("You're already watching this streamer");
    } else if (userInput === "") {
      console.log("You need to have a username");
    } else if (streamers.length > 4) {
      console.log("Exceeded the maximum number of streamers");
    } else {
      setStreamers([...streamers, userInput]);
    }
  };

  const closeFeed = (e) => {
    const filtered = streamers.filter((streamer) => {
      return streamer !== e;
    });
    setStreamers(filtered);
  };

  return (
    <div className={styles.twitchContainer}>
      <form
        action=""
        onSubmit={(e) => {
          addVideoFeed(e);
        }}
      >
        <input
          type="text"
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Streamer name"
        />
        <input type="submit" className="submit" />
      </form>
      <div className={styles.videoContainer}>{videoFeed}</div>
    </div>
  );
};

export default MultiView;
