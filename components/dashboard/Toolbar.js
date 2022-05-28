import React, { useRef, useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import Link from "next/link";
import { mouseIn, mouseOut } from "../NavBarAnimation";
import gsap from "gsap";
import Switch from "../Switch";
import { useDispatch, useSelector } from "react-redux";
import { darkModeOn, darkModeOff } from "../../redux/actions/darkModeSlice";
import { selectMenu } from "../../redux/actions/juiceboxMenuSlice";
import ModChannelDisplay from "./ModChannelDisplay";
import { useSession } from "next-auth/react";
import SocketIOClient from "socket.io-client";
import { server } from "../../config";
import { useRouter } from "next/router";

const Toolbar = ({ children }) => {
  const router = useRouter;
  const session = useSession();
  const dispatch = useDispatch();
  const ref = useRef();
  const [menuSelector, setMenuSelector] = useState("dashboard");
  const [tween, setTween] = useState();
  const [animState, setAnimState] = useState(false);
  const darkMode = useSelector((state) => state?.darkMode?.value);
  const user = useSelector((state) => state?.user?.value);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true }).fromTo(
      "#toolbar",
      { x: 0 },
      {
        x: 250,
      }
    );

    setTween(tl);
  }, []);

  const streamerChannels = async (option) => {
    if (option === "open") {
    } else {
    }
  };

  const tweenAnim = () => {
    if (animState === false) {
      tween.play(0);
    } else {
      tween.reverse(0);
    }
    setAnimState(!animState);
  };

  return (
    <>
      <div
        id="toolbar"
        className={
          darkMode ? styles.darkToolBarContainer : styles.toolBarContainer
        }
      >
        <div
          className={darkMode ? styles.darkToolBarButton : styles.toolBarButton}
          onClick={() => {
            tweenAnim();
          }}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>

        <div className={styles.toolBarMenu}>
          <h3 style={{ textAlign: "center" }}>Menu</h3>
          <span
            className={styles.selector}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(selectMenu("dashboard"))}
          >
            <h4
              className={styles.link}
              onMouseEnter={() => {
                mouseIn("dashboard", "ダッシュボード");
              }}
              onMouseLeave={() => {
                mouseOut("dashboard", "Dashboard");
              }}
              ref={ref}
              id="dashboard"
            >
              Dashboard
            </h4>
          </span>
          <span
            className={styles.selector}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(selectMenu("settings"))}
          >
            <h4
              className={styles.link}
              onMouseEnter={() => {
                mouseIn("settings", "設定");
              }}
              onMouseLeave={() => {
                mouseOut("settings", "Settings");
              }}
              ref={ref}
              id="settings"
            >
              Settings
            </h4>
          </span>
        </div>

        <div className={styles.streamerToolsContainer}>
          <h3 style={{ textAlign: "center" }}>Streamer Tools</h3>
          <span
            className={styles.selector}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(selectMenu("giveaway"))}
          >
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
          </span>
        </div>
        <div className={styles.modToolsContainer}>
          <h3 style={{ textAlign: "center" }}>Mod tools</h3>
          <span
            className={styles.selector}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(selectMenu("mod-controls"))}
          >
            <h4
              className={styles.link}
              onMouseEnter={() => {
                mouseIn("mod-controls", "(Japanese text)");
              }}
              onMouseLeave={() => {
                mouseOut("mod-controls", "Mod-Controls");
              }}
              ref={ref}
              id="mod-controls"
            >
              Mod-Controls
            </h4>
          </span>
        </div>
        <ModChannelDisplay streamerChannels={streamerChannels} user={user} />
        <div className={styles.darkMode}>
          <h5>Dark Mode</h5>
          <Switch isOn={darkMode} onColor={"#06D6A0"} />
        </div>
      </div>

      <>{children}</>
    </>
  );
};

export default Toolbar;
