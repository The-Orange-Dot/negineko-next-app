export const getStaticProps = async () => {
  //Gets OAuth token from Twitch
  const token = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=05rkef9kwzbr5jdi4ahjbuj3uc83ov&client_secret=6a189h8gvw8pjxlsh8l7vdy1rp46jn&grant_type=client_credentials&scope=viewing_activity_read`,
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
        "Client-Id": "05rkef9kwzbr5jdi4ahjbuj3uc83ov",
      },
    }
  );
  const data = await res.json();
  //Fetches Negi's stream to see if she's online
  const fetchStream = await fetch(
    "https://api.twitch.tv/helix/streams?user_login=negineko_tokyo",
    {
      headers: {
        Authorization: `Bearer ${tokenParsed.access_token}`,
        "Client-Id": "05rkef9kwzbr5jdi4ahjbuj3uc83ov",
      },
    }
  );

  const stream = await fetchStream.json();

  return {
    props: { user: data, stream: stream },
  };
};

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/about.module.css";
import { mouseIn, mouseOut } from "../components/about/PictureMouseAnimation";
import { useMediaQuery } from "react-responsive";

const About = ({ user, stream }) => {
  const [negi, setNegi] = useState(user.data[0]);
  const [orange, setOrange] = useState(user.data[1]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const streamOnline = stream.data;
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    //Sorts the users alphabetically
    const sorted = user.data.sort((a, b) =>
      a.login > b.login ? 1 : b.login > a.login ? -1 : 0
    );
    isMobile ? setMobile(true) : setMobile(false);
    setNegi(sorted[0]);
    setOrange(sorted[1]);
    setPageLoaded(true);
    console.log("Page Loaded");
  }, [user.data, isMobile]);

  return (
    <div className={styles.aboutPageContainer}>
      <p>Under construction</p>
      <div className={styles.aboutContainer}>
        {streamOnline.length ? (
          <div>
            <p>Negi is Online!</p>
          </div>
        ) : null}
        <p>{negi?.description}</p>
        <h2>NegiNeko Team</h2>
        <div className={styles.teamContainer}>
          {pageLoaded ? (
            <>
              <div className={mobile ? styles.mobileContainer : styles.none}>
                <h3>{negi.display_name.slice(0, 4)}</h3>
                {negi.profile_image_url ? (
                  <div
                    style={{
                      width: 300,
                      height: 310,
                      backgroundImage: "url(images/negi.png)",
                      objectFit: "contain",
                      borderRadius: "100rem",
                      backgroundSize: "100%",
                    }}
                    onMouseEnter={() => {
                      mouseIn("negi");
                    }}
                    onMouseLeave={() => {
                      mouseOut("negi");
                    }}
                  >
                    <Image
                      src="/images/negi3.png"
                      alt="negi"
                      width={300}
                      height={310}
                      className={styles.teamPhoto}
                      id="negi"
                      priority
                    />
                  </div>
                ) : null}
              </div>
              <div className={mobile ? styles.mobileContainer : styles.none}>
                <h3>{orange.display_name.slice(4, 10)}</h3>
                {orange.profile_image_url ? (
                  <div
                    style={{
                      width: 300,
                      height: 310,
                      backgroundImage: "url(images/orange.jpeg)",
                      objectFit: "cover",
                      borderRadius: "100rem",
                    }}
                    onMouseEnter={() => {
                      mouseIn("orange");
                    }}
                    onMouseLeave={() => {
                      mouseOut("orange");
                    }}
                  >
                    <Image
                      src={orange.profile_image_url}
                      alt="negi"
                      width={300}
                      height={310}
                      className={styles.teamPhoto}
                      id="orange"
                      priority
                    />
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.redCrossCanada}>
        <h3>Charity Event - Canadian Red Cross</h3>
        <p>April 27, 2022 - March 6, 2022</p>
        <p>Ukrainain Humanitarian Crisis Appeal</p>
        <p>Raised CA$2,371 to provide humanitarian relief in Ukraine</p>
      </div>
      <div></div>
    </div>
  );
};

export default About;
