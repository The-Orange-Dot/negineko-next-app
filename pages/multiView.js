import React, { useEffect, useState } from "react";
import styles from "../styles/multiView.module.css";
import { TwitchChat, TwitchEmbed } from "react-twitch-embed";
import { useMediaQuery } from "react-responsive";

const MultiView = () => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [mobile, setMobile] = useState(false);
  const [streamers, setStreamers] = useState(["negineko_tokyo"]);
  const [userInput, setUserInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    isMobile ? setMobile(true) : setMobile(false);
  }, [isMobile]);

  const videoFeed = streamers.map((streamer) => {
    return (
      <div
        key={streamer}
        className={
          streamers.length > 1
            ? styles.streamerContainer
            : styles.oneStreamerContainer
        }
      >
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
          {loaded ? (
            <span
              className={
                streamers.length > 1
                  ? styles.videoPlayer
                  : styles.oneVideoPlayer
              }
            >
              {streamers.length > 1 ? (
                <>
                  <TwitchEmbed
                    channel={streamer}
                    id={streamer}
                    theme="dark"
                    withChat={false}
                    muted
                    width={700}
                    height="78.5%"
                    className={styles.multiEmbed}
                  />
                  <TwitchChat
                    channel={streamer}
                    width={700}
                    theme="dark"
                    height="650px"
                    className={styles.multiEmbed}
                  />
                </>
              ) : (
                <>
                  <TwitchEmbed
                    channel={streamer}
                    id={streamer}
                    theme="dark"
                    withChat={false}
                    muted
                    width={1000}
                    height="100%"
                  />
                  <TwitchChat
                    channel={streamer}
                    width={400}
                    theme="dark"
                    height="650px"
                  />
                </>
              )}
            </span>
          ) : (
            <h1>Loading Player...</h1>
          )}
        </div>
      </div>
    );
  });

  //when submit button is pressed
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

  //Closes streamer channel feed
  const closeFeed = (e) => {
    const filtered = streamers.filter((streamer) => {
      return streamer !== e;
    });
    setStreamers(filtered);
  };

  return (
    <>
      <p style={{ width: "100%", textAlign: "center" }}>
        Watch more than one Twitch stream! Just type the streamer username
        below.
      </p>
      {mobile ? (
        <div className={styles.underConstructionContainer}>
          <p>Multi-view isn&apos;t available for mobile...yet</p>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default MultiView;
