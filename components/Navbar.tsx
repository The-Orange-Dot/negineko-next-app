import Link from "next/link";
import React, { useEffect, useRef } from "react";
import styles from "../styles/navbar.module.css";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import dynamic from "next/dynamic";
import TextPlugin from "gsap/dist/TextPlugin";
import { mouseIn, mouseOut } from "./NavBarAnimation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userLoginSlice";
import io from "socket.io-client";
import { server } from "../config";

const socket = io(server, {
  transports: ["websocket"],
  path: "/api/socket",
  withCredentials: true,
});

const Navbar = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
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
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const navBarHandler = (value: "open" | "close") => {
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
  useEffect(() => {
    if (session) {
      dispatch(loginUser(session));
    }

    socket.emit("init");
  }, [session, dispatch]);

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
                  Travel
                </h4>
              </Link>

              <Link href="/store" passHref={true}>
                <h4
                  className={styles.link}
                  onMouseEnter={() => {
                    mouseIn("store", "ショップ");
                  }}
                  onMouseLeave={() => {
                    mouseOut("store", "Shop");
                  }}
                  ref={ref}
                  id="store"
                >
                  Shop
                </h4>
              </Link>

              <Link href="/multiView" passHref={true}>
                <h4
                  className={styles.link}
                  onMouseEnter={() => {
                    mouseIn("multi", "マルチビュー");
                  }}
                  onMouseLeave={() => {
                    mouseOut("multi", "Multi-view");
                  }}
                  ref={ref}
                  id="multi"
                >
                  Multi-view
                </h4>
              </Link>

              <Link
                href={session ? `/dashboard` : `/api/auth/signin`}
                passHref={true}
              >
                <h4
                  className={styles.link}
                  onMouseEnter={() => {
                    mouseIn("juicebox", "ジュースボックス");
                  }}
                  onMouseLeave={() => {
                    mouseOut("juicebox", "Juice-box");
                  }}
                  ref={ref}
                  id="juicebox"
                >
                  Juice-box
                </h4>
              </Link>
            </div>
            <div className={styles.signInButton}>
              {/* <Link href="/account/login" passHref={true}>
                <button>Sign In</button>
              </Link> */}
              {session ? (
                <button className={styles.button} onClick={() => signOut()}>
                  Sign Out
                </button>
              ) : (
                <button className={styles.button} onClick={() => signIn()}>
                  Sign In
                </button>
              )}
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
                <Link href="/travel"> Travel </Link>
              </p>
              <p
                onClick={() => {
                  navBarHandler("close");
                }}
              >
                <Link href="/store"> Store </Link>
              </p>
            </div>
          </div>
        </div>
      </MediaQuery>
    </>
  );
};

export default Navbar;
