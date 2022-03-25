import React, { useEffect, useState } from "react";
import styles from "../styles/multiView.module.css";
import Script from "next/script";
import { TwitchChat, TwitchEmbed } from "react-twitch-embed";
import MediaQuery from "react-responsive";
import dynamic from "next/dynamic";

const MultiView = () => {
  const MediaQuery = dynamic(
    () => {
      return import("react-responsive");
    },
    { ssr: false }
  );
  const [streamers, setStreamers] = useState(["negineko_tokyo"]);
  const [userInput, setUserInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
                    width={`100%`}
                    height="70%"
                  />
                  <TwitchChat
                    channel={streamer}
                    width="100%"
                    theme="dark"
                    height="650px"
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
                    width={`100%`}
                    height="100%"
                  />
                  <TwitchChat
                    channel={streamer}
                    width="50%"
                    theme="dark"
                    height="650px"
                  />
                </>
              )}
            </span>
          ) : (
            <h1>Loading Player...</h1>
          )}

          {/* <iframe
            src={`https://player.twitch.tv/?channel=${streamer}&parent=negineko-site.herokuapp.com&muted=true&parent=localhost&embed=true`}
            height="380"
            width="675"
            allowFullScreen={true}
            className={styles.iframe}
          ></iframe>
          <iframe
            src={`https://www.twitch.tv/embed/${streamer}/chat?parent=negineko-site.herokuapp.com&parent=localhost&embed=true`}
            height="400"
            width="675"
            className={styles.iframe}
          ></iframe> */}
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
    <>
      <MediaQuery minWidth={901}>
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
      </MediaQuery>
      <MediaQuery maxWidth={900}>
        <div className={styles.underConstructionContainer}>
          <p>Multi-view isn&apos;t available for mobile...yet</p>
        </div>
      </MediaQuery>
    </>
  );
};

export default MultiView;
