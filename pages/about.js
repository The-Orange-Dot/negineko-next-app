import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/about.module.css";
import gsap from "gsap";

const About = () => {
  const [user, setUser] = useState({
    data: [],
  });
  const [pageLoaded, setPageLoaded] = useState(false);
  const [streamOnline, setStreamOnline] = useState([]);

  useEffect(() => {
    fetch("/api/userInfo")
      .then((r) => r.json())
      .then((client) => {
        //Fetches Authorization for app to use twitch API
        fetch(
          `https://id.twitch.tv/oauth2/token?client_id=${client.clientId}&client_secret=${client.secretKey}&grant_type=client_credentials&scope=viewing_activity_read`,
          {
            method: "POST",
          }
        )
          .then((r) => r.json())
          .then((data) => {
            //Gets Negi's stream info if we're online or not
            fetch(
              "https://api.twitch.tv/helix/streams?user_login=negineko_tokyo",
              {
                headers: {
                  Authorization: `Bearer ${data.access_token}`,
                  "Client-Id": "05rkef9kwzbr5jdi4ahjbuj3uc83ov",
                },
              }
            )
              .then((r) => r.json())
              .then((stream) => {
                setStreamOnline(stream.data[0]);
              });

            //Gets Negi's user info
            fetch(
              "https://api.twitch.tv/helix/users?login=negineko_tokyo&login=the_orange_dot",
              {
                headers: {
                  Authorization: `Bearer ${data.access_token}`,
                  "Client-Id": "05rkef9kwzbr5jdi4ahjbuj3uc83ov",
                },
              }
            )
              .then((r) => r.json())
              .then((data) => {
                setUser(data);
                setPageLoaded(true);
              });
          });
      });
  }, []);

  const negi = user?.data[0];
  const orange = user?.data[1];

  return (
    <div className={styles.aboutPageContainer}>
      <p>Also under construction</p>
      <div className={styles.aboutContainer}>
        {streamOnline ? (
          <div>
            <p>Negi is Online!</p>
          </div>
        ) : null}
        <p>{negi?.description}</p>
        <h2>NegiNeko Team</h2>
        <div className={styles.teamContainer}>
          {pageLoaded ? (
            <>
              <div>
                <h3>{negi.display_name.slice(0, 4)}</h3>
                <Image
                  src={negi.profile_image_url}
                  alt="negi"
                  width={300}
                  height={310}
                  className={styles.teamPhoto}
                  priority
                />
              </div>
              <div>
                <h3>{orange.display_name.slice(4, 10)}</h3>
                <Image
                  src={orange.profile_image_url}
                  alt="negi"
                  width={300}
                  height={310}
                  className={styles.teamPhoto}
                  priority
                />
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
