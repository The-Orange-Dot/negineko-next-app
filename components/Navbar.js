import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/navbar.module.css";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import dynamic from "next/dynamic";
import TextPlugin from "gsap/dist/TextPlugin";
import { mouseIn, mouseOut } from "./NavBarAnimation";

const Navbar = () => {
  /**
   * This fixed "Expected server HTML to contain a matching <div> in <div>"
   */
  const MediaQuery = dynamic(
    () => {
      return import("react-responsive");
    },
    { ssr: false }
  );
  gsap.registerPlugin(TextPlugin);
  const ref = useRef();
  const [homeTween, setHomeTween] = useState("");
  const [aboutTween, setAboutTween] = useState("");
  const [travelLogTween, setTravelLogTween] = useState("");
  const [multiViewTween, setMultiViewTween] = useState("");
  const [giveawayTween, setGiveawayTween] = useState("");
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
    <>
      <MediaQuery minWidth={901}>
        <div className={styles.navBarPageContainer}>
          <div className={styles.navBarContent}>
            <div className={styles.logo}>
              <Link href="/" passHref={true}>
                <h3>NegiNeko_Tokyo</h3>
              </Link>
            </div>
            <div className={styles.pageSelector}>
              <Link href="/" passHref={true}>
                <h4
                  className={styles.link}
                  onMouseEnter={() => {
                    mouseIn("home", "ホーム");
                  }}
                  onMouseLeave={() => {
                    mouseOut("home", "Home");
                  }}
                  id="home"
                  ref={ref}
                >
                  Home
                </h4>
              </Link>

              <Link href="/about" passHref={true}>
                <h4
                  className={styles.link}
                  onMouseEnter={() => {
                    mouseIn("about", "自己紹介");
                  }}
                  onMouseLeave={() => {
                    mouseOut("about", "About");
                  }}
                  ref={ref}
                  id="about"
                >
                  About
                </h4>
              </Link>

              <Link href="/travel" passHref={true}>
                <h4
                  className={styles.link}
                  onMouseEnter={() => {
                    mouseIn("travel", "旅ログ");
                  }}
                  onMouseLeave={() => {
                    mouseOut("travel", "Travels");
                  }}
                  ref={ref}
                  id="travel"
                >
                  Travels
                </h4>
              </Link>

              <Link href="/multiView" passHref={true}>
                <h4
                  className={styles.link}
                  onMouseEnter={() => {
                    mouseIn("multi", "マルチビュー");
                  }}
                  onMouseLeave={() => {
                    mouseOut("multi", "Multi-viewer");
                  }}
                  ref={ref}
                  id="multi"
                >
                  Multi-viewer
                </h4>
              </Link>

              <Link href="/giveaway" passHref={true}>
                <h4
                  className={styles.link}
                  onMouseEnter={() => {
                    mouseIn("giveaway", "抽選機能");
                  }}
                  onMouseLeave={() => {
                    mouseOut("giveaway", "Raffle-tool");
                  }}
                  ref={ref}
                  id="giveaway"
                >
                  Raffle-tool
                </h4>
              </Link>
            </div>
            <div className={styles.signInButton}>
              <Link href="/login" passHref={true}>
                <button>Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={900}>
        <div className={styles.navBarMobileContainer}>
          <div className={styles.navBarMobileContent}>
            <div className={styles.logo}>
              <Link href="/" passHref={true}>
                <h3 className={styles.mobileHeader}>NegiNeko_Tokyo</h3>
              </Link>
            </div>
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
            {isMobile && (
              <div
                className={`${styles.blurOverlay} openNavBar`}
                onClick={() => {
                  navBarHandler("close");
                }}
              />
            )}
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
              {/* <p
                onClick={() => {
                  navBarHandler("close");
                }}
              >
                <Link href="/multiView"> Multi-view </Link>
              </p>
              <p
                onClick={() => {
                  navBarHandler("close");
                }}
              >
                <Link href="/giveaway"> Giveaway-tool </Link>
              </p> */}
            </div>
          </div>
        </div>
      </MediaQuery>
    </>
  );
};

export default Navbar;
