import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../styles/homepage.module.css";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import gsap from "gsap";

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
    console.log("Page Loaded");

    gsap
      .timeline()
      .fromTo(
        "#title",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, ease: "Power1.easeOut", duration: 0.7 },
        0.5
      )
      .from("#circle", { y: -1000, ease: "Power4.easeOut", duration: 1.5 })
      .fromTo(
        "#nacchan",
        { bottom: -550 },
        { bottom: 0, ease: "Power4.easeOut", duration: 1 },
        3
      )
      .fromTo(
        "#mocchan",
        { left: 550 },
        { left: 0, ease: "Power4.easeOut", duration: 1 },
        2.5
      );
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
        <Link href="https://www.twitch.tv/negineko_tokyo" passHref={true}>
          <h3 className={styles.link}>twitch.tv/negineko_tokyo</h3>
        </Link>
      </div>
      {mobile ? (
        <div className={styles.mobileBackgroundCircle}></div>
      ) : (
        <div>
          <Image
            src="/images/map_tokyo.png"
            alt="map"
            layout="fill"
            className={styles.map}
          />
          <div className={styles.backgroundCircle} id="circle">
            <div className={styles.nacchan}>
              <Image
                src="/images/Nacchan.png"
                alt="nacchan"
                width={350}
                height={350}
                id="nacchan"
              />
            </div>
          </div>
          <div className={styles.mocchan}>
            <Image
              src="/images/Mocchan.png"
              alt="mocchan"
              width={400}
              height={400}
              id="mocchan"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
