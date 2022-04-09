export const getStaticProps = async () => {
  //Gets OAuth token from Twitch
  const token = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=05rkef9kwzbr5jdi4ahjbuj3uc83ov&client_secret=6a189h8gvw8pjxlsh8l7vdy1rp46jn&grant_type=client_credentials&scope=viewing_activity_read`,
    {
      method: "POST",
    }
  );
  const tokenParsed = await token.json();

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
    props: { stream: stream },
  };
};

import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../styles/homepage.module.css";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import gsap from "gsap";
import TextPlugin from "gsap/dist/TextPlugin";

const Home = ({ stream }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const fetchStream = stream.data;
  const [subtitleTween, setSubtitleTween] = useState("");
  const [tween, setTween] = useState();
  const [JP, setJP] = useState(true);
  gsap.registerPlugin(TextPlugin);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
    console.log("Page Loaded");

    //Starting animation
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(
        "#title",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, ease: "Power1.easeOut", duration: 0.7 },
        0.5
      )
      .from("#subtitle", { opacity: 0 })
      .from("#twitchLink", { opacity: 0 }, 1.5)
      .from("#circle", { y: -1000, ease: "Power4.easeOut", duration: 1.5 })
      .fromTo(
        "#nacchan",
        { bottom: -850 },
        { bottom: 0, ease: "Power4.easeOut", duration: 1 },
        3
      )
      .fromTo(
        "#negi",
        { left: -1550 },
        { left: 0, ease: "Power4.easeOut", duration: 1 },
        2.5
      )
      .fromTo("#live-text", { opacity: 0, y: 110 }, { opacity: 1, y: 80 });

    setTween(tl);

    //Subtitle text animation Timeline and tween
    const subtitleTween = gsap.timeline({ paused: "true" });
    subtitleTween.to("#subtitle", {
      text: { value: "Let’s go on a journey together!" },
      ease: "Power2.easeInOut",
    });
    setSubtitleTween(subtitleTween);
  }, [isMobile]);

  const mobileLoadHandler = () => {
    if (mobile) {
      tween.play();
      setTimeout(() => {
        subtitleTween?.play(0);
        setJP(false);
      }, 3500);
    }
  };

  return (
    <div
      className={
        mobile ? styles.mobileHomePageContainer : styles.homePageContainer
      }
    >
      <div className={styles.homePageContent} id="title">
        <h1 className={mobile ? styles.mobileNegiTitle : styles.negiTitle}>
          NEGINEKO_TOKYO
        </h1>

        <div
          className={styles.subtitleContainer}
          onMouseEnter={() => {
            if (!mobile) {
              subtitleTween.play(0);
            }
          }}
          onMouseLeave={() => {
            if (!mobile) {
              subtitleTween.reverse(0);
            }
          }}
        >
          <h1
            className={mobile ? styles.mobileSubtitle : styles.subtitle}
            id="subtitle"
          >
            一緒に旅へ出かけよう！
          </h1>
        </div>
        <Link href="https://www.twitch.tv/negineko_tokyo" passHref={true}>
          <h3 className={styles.link} id="twitchLink">
            twitch.tv/negineko_tokyo
          </h3>
        </Link>
      </div>

      <div>
        <div
          className={
            mobile ? styles.mobileBackgroundCircle : styles.backgroundCircle
          }
          id="circle"
        >
          <div className={styles.nacchan}>
            {fetchStream.length ? (
              <h1 className={styles.liveText} id="live-text">
                We&apos;re live now!
              </h1>
            ) : null}
            {mobile ? null : (
              <Image
                src="/images/Nacchan.png"
                alt="nacchan"
                width={mobile ? 200 : 450}
                height={mobile ? 200 : 450}
                id="nacchan"
                priority={true}
              />
            )}
          </div>
        </div>

        {mobile ? (
          <div className={styles.negi}>
            <Image
              src="/images/negi-homepage.png"
              alt="negi"
              width={450}
              height={450}
              id="negi"
              placeholder="empty"
              onLoadingComplete={() => {
                mobileLoadHandler();
              }}
            />
          </div>
        ) : (
          <div className={styles.negi}>
            <Image
              src="/images/negi-homepage.png"
              alt="negi"
              width={700}
              height={700}
              id="negi"
              placeholder="empty"
              onLoadingComplete={() => {
                tween.play();
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          backgroundImage: "url(/images/map_tokyo.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          zIndex: -5,
          width: mobile ? "500%" : "100%",
          height: mobile ? "500%" : "100%",
          position: mobile ? "fixed" : "absolute",
          left: 0,
          top: 0,
          opacity: "5%",
        }}
        id="background"
      ></div>
    </div>
  );
};

export default Home;
