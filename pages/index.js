import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../styles/homepage.module.css";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import gsap from "gsap";
import TextPlugin from "gsap/dist/TextPlugin";
import { mouseIn, mouseOut } from "../components/homepage/NegiMouseAnimation";

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);
  const [subtitleTween, setSubtitleTween] = useState("");
  gsap.registerPlugin(TextPlugin);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
    console.log("Page Loaded");

    //Starting animation
    gsap
      .timeline()
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
      );

    //Subtitle text animation Timeline and tween
    const subtitleTween = gsap.timeline({ paused: "true" });
    subtitleTween.to("#subtitle", {
      text: { value: "Let’s go on a journey together!" },
      ease: "Power2.easeInOut",
    });
    setSubtitleTween(subtitleTween);
  }, [isMobile]);

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
            subtitleTween.play(0);
          }}
          onMouseLeave={() => {
            subtitleTween.reverse(0);
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
      {mobile ? (
        <div className={styles.mobileBackgroundCircle}></div>
      ) : (
        <div>
          {/* <Image
            src="/images/map_tokyo.png"
            alt="map"
            layout="fill"
            className={styles.map}
          /> */}
          <div className={styles.backgroundCircle} id="circle">
            <div className={styles.nacchan}>
              <Image
                src="/images/Nacchan.png"
                alt="nacchan"
                width={450}
                height={450}
                id="nacchan"
              />
            </div>
          </div>

          <div className={styles.negi}>
            <Image
              src="/images/negi-homepage.png"
              alt="negi"
              width={700}
              height={700}
              id="negi"
            />
          </div>
        </div>
      )}
      <div
        style={{
          backgroundImage: "url(/images/map_tokyo.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          zIndex: -5,
          width: "100%",
          height: "100%",
          position: "absolute",
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
