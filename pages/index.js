export const getStaticProps = async () => {
  //Gets OAuth token from Twitch
  const token = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=viewing_activity_read`,
    {
      method: "POST",
    }
  );

  const tokenParsed = await token.json();

  // //Fetches Negi's stream to see if she's online
  // const fetchStream = await fetch(
  //   "https://api.twitch.tv/helix/streams?user_login=negineko_tokyo",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${tokenParsed.access_token}`,
  //       "Client-Id": process.env.TWITCH_CLIENT_ID,
  //     },
  //   }
  // );

  // const stream = await fetchStream.json();

  return {
    props: { accessToken: tokenParsed },
  };
};

import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../styles/homepage.module.css";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import gsap from "gsap";
import TextPlugin from "gsap/dist/TextPlugin";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../redux/actions/tokenSlice";

const Home = ({ accessToken }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const [subtitleTween, setSubtitleTween] = useState("");
  const [JP, setJP] = useState(true);
  gsap.registerPlugin(TextPlugin);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { data: session } = useSession();
  // const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const [tween, setTween] = useState("");

  useEffect(
    () => {
      dispatch(addToken(accessToken));

      isMobile ? setMobile(true) : setMobile(false);

      //Starting animation
      const tl = gsap
        .timeline({ paused: true })
        .to(".page-container", { opacity: 1 })
        .fromTo(
          "#title",
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, ease: "Power1.easeOut", duration: 0.7 },
          0.5
        )
        .fromTo("#subtitle", { opacity: 0 }, { opacity: 1 })
        .fromTo("#twitchLink", { opacity: 0 }, { opacity: 1 }, 1.5)
        .to("#circle", { opacity: 1 }, 2)
        .fromTo(
          "#circle",
          { y: -1000, ease: "Power4.easeOut", duration: 1.5 },
          { y: 0 },
          2
        )
        .fromTo(
          "#nacchan",
          { bottom: -850 },
          { bottom: 0, ease: "Power4.easeOut", duration: 1 },
          2.5
        )
        .fromTo(
          "#negi",
          { left: -1550 },
          { left: 0, ease: "Power4.easeOut", duration: 1 },
          2.8
        )
        .fromTo("#live-text", { opacity: 0, y: 110 }, { opacity: 1, y: 80 })
        .fromTo(".user-display", { opacity: 0, y: -30 }, { opacity: 1, y: 0 });

      //Subtitle text animation Timeline and tween
      const subtitleTween = gsap.timeline({ paused: "true" });
      subtitleTween.to("#subtitle", {
        text: { value: "Let???s go on a journey together!" },
        ease: "Power2.easeInOut",
      });
      setSubtitleTween(subtitleTween);
      setPageLoaded(true);
      setTween(tl);
      console.log("Page Loaded");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, mobile]
  );

  const mobileLoadHandler = () => {
    tween.play(0);

    if (mobile) {
      setTimeout(() => {
        subtitleTween?.play(0);
        setJP(false);
      }, 3500);
    }
  };

  const playTween = () => {
    tween.play(0);
  };

  return (
    <div
      className={
        mobile
          ? styles.mobileHomePageContainer
          : `${styles.homePageContainer} page-container`
      }
    >
      <div className={`${styles.userDisplay} user-display`}>
        {session && !mobile ? <h2>Welcome, {session.user.name}!</h2> : null}
      </div>
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
            ?????????????????????????????????
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
          className={`circle ${
            mobile ? styles.mobileBackgroundCircle : styles.backgroundCircle
          }`}
          id="circle"
        >
          <div className={styles.nacchan}>
            <h1 className={styles.liveText} id="live-text">
              OMG! 10,000 followers!
            </h1>

            {mobile ? null : (
              <Image
                src="/images/Nacchan.png"
                alt="nacchan"
                width={mobile ? 100 : 450}
                height={mobile ? 100 : 450}
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
                playTween();
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
