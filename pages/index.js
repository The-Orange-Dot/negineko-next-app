import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../styles/homepage.module.css";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
    console.log("Page Loaded");
  }, [isMobile]);

  return (
    <div
      className={
        mobile ? styles.mobileHomePageContainer : styles.homePageContainer
      }
    >
      <div className={styles.homePageContent}>
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
        <div className={styles.backgroundCircle}></div>
      )}
    </div>
  );
};

export default Home;
