export const getStaticProps = async () => {
  //Gets OAuth token from Twitch
  const token = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=viewing_activity_read+moderation%3Aread`,
    {
      method: "POST",
    }
  );
  const tokenParsed = await token.json();
  //Fetches Negi and Orange's data from Twitch
  const res = await fetch(
    "https://api.twitch.tv/helix/users?login=negineko_tokyo&login=the_orange_dot",
    {
      headers: {
        Authorization: `Bearer ${tokenParsed.access_token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
    }
  );

  const data = await res.json();
  return {
    props: { user: data },
  };
};

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/about.module.css";

import { useMediaQuery } from "react-responsive";
import Negi from "../../components/about/info/Negi";
import Mocchan from "../../components/about/info/Mocchan";
import Nacchan from "../../components/about/info/Nacchan";
import Orange from "../../components/about/info/Orange";
import Events from "../../components/about/accomplishments/events";
import gsap from "gsap";

const About = ({ user }) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const [teamSelector, setTeamSelector] = useState("negi");
  const [teamView, setTeamView] = useState(<Negi />);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
    setPageLoaded(true);
    console.log("Page Loaded");
  }, [isMobile]);

  console.log(user);

  const teamSelectorHandler = (member) => {
    switch (member) {
      case "mocchan":
        setTeamSelector("mocchan");
        setTeamView(<Mocchan />);
        break;
      case "nacchan":
        setTeamSelector("nacchan");
        setTeamView(<Nacchan />);
        break;
      case "orange":
        setTeamSelector("orange");
        setTeamView(<Orange />);
        break;
      default:
        setTeamSelector("negi");
        setTeamView(<Negi />);
    }
  };

  return (
    <div className={styles.aboutPageContainer}>
      <h1>Who we are</h1>
      <div className={styles.aboutContainer}>
        <p>
          ようこそ〜！IRL TOKYO! A streamer from Japan that shows around
          Japanese Culture! Watch this and you can vicariously live the Japanese
          Life through our camera!!!
        </p>
        <h2>The NegiNeko Team</h2>
        <div
          className={
            mobile ? styles.mobileTeamSelector : styles.negiTeamSelector
          }
        >
          <span>
            <h3
              onClick={() => {
                teamSelectorHandler("negi");
              }}
              className={
                teamSelector === "negi"
                  ? styles.memberSelected
                  : styles.memberNotSelected
              }
            >
              Negi
            </h3>
          </span>
          <span>
            <h3
              onClick={() => {
                teamSelectorHandler("mocchan");
              }}
              className={
                teamSelector === "mocchan"
                  ? styles.memberSelected
                  : styles.memberNotSelected
              }
            >
              Mocchan
            </h3>
          </span>
          <span>
            <h3
              onClick={() => {
                teamSelectorHandler("nacchan");
              }}
              className={
                teamSelector === "nacchan"
                  ? styles.memberSelected
                  : styles.memberNotSelected
              }
            >
              Nacchan
            </h3>
          </span>
          <span>
            <h3
              onClick={() => {
                teamSelectorHandler("orange");
              }}
              className={
                teamSelector === "orange"
                  ? styles.memberSelected
                  : styles.memberNotSelected
              }
            >
              Orange
            </h3>
          </span>
        </div>
        <div className={styles.teamContainer}>
          {pageLoaded ? (
            <>
              <div
                className={
                  mobile ? styles.mobileContainer : styles.teamContainer
                }
              >
                {pageLoaded ? teamView : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div
        className={mobile ? "" : styles.events}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Event History</h1>
        <div
          className={
            mobile ? styles.mobileEventsContainer : styles.eventsContainer
          }
        >
          <Events />
        </div>
      </div>
    </div>
  );
};

export default About;
