import Link from "next/link";
import React from "react";
import styles from "../styles/navbar.module.css";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useState } from "react";
import gsap from "gsap";
import { useEffect } from "react";

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const navBarHandler = (value) => {
    value === "open"
      ? gsap.fromTo(
          ".openNavBar",
          { display: "none", opacity: 0, y: -100 },
          { display: "block", opacity: 1, y: 0 }
        )
      : gsap.fromTo(
          ".openNavBar",
          { display: "block", opacity: 1, y: 0 },
          { display: "none", opacity: 0, y: -100 }
        );
  };

  return (
    <div
      className={
        isMobile ? styles.navBarMobileContainer : styles.navBarPageContainer
      }
    >
      <div
        className={isMobile ? styles.navBarMobileContent : styles.navBarContent}
      >
        <div className={styles.logo}>
          <Link href="/" passHref={true}>
            <h3 className={isMobile ? styles.mobileHeader : ""}>
              NegiNeko_Tokyo
            </h3>
          </Link>
        </div>
        <MediaQuery minWidth={901}>
          <div className={styles.pageSelector}>
            <h4>
              <Link href="/"> Home </Link>
            </h4>
            <h4>
              <Link href="/about"> About </Link>
            </h4>
            <h4>
              <Link href="/travel"> Travel-Log </Link>
            </h4>
            <h4>
              <Link href="/multiView"> Multi-view </Link>
            </h4>
          </div>
          <div className={styles.signInButton}>
            <button>Sign In</button>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={900}>
          <div
            className={styles.barContainer}
            onClick={() => {
              navBarHandler("open");
            }}
          >
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
          </div>
          <div
            className={`${styles.blurOverlay} openNavBar`}
            onClick={() => {
              navBarHandler("close");
            }}
          />
          <div className={`${styles.mobileNavBarSelector} openNavBar`}>
            <p
              onClick={() => {
                navBarHandler("close");
              }}
            >
              <Link href="/"> Home </Link>
            </p>
            <p
              onClick={() => {
                navBarHandler("close");
              }}
            >
              <Link href="/about"> About </Link>
            </p>
            <p
              onClick={() => {
                navBarHandler("close");
              }}
            >
              <Link href="/travel"> Travel-log </Link>
            </p>
            <p
              onClick={() => {
                navBarHandler("close");
              }}
            >
              <Link href="/multiView"> Multi-view </Link>
            </p>
          </div>
        </MediaQuery>
      </div>
    </div>
  );
};

export default Navbar;
