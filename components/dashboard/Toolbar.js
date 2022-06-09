import React, { useRef, useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import { mouseIn, mouseOut } from "../NavBarAnimation";
import gsap from "gsap";
import Switch from "../Switch";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "../../redux/actions/juiceboxMenuSlice";
import ModChannelDisplay from "./ModChannelDisplay";

const Toolbar = ({ children, tween, setTween }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [animState, setAnimState] = useState(true);
  const darkMode = useSelector((state) => state?.darkMode?.value);
  const user = useSelector((state) => state?.user?.value);
  const hide = useSelector((state) => state.hideMenu.value);

  useEffect(
    () => {
      const tl = gsap
        .timeline()

        .fromTo(
          "#toolbar",
          { x: 0 },
          {
            x: 250,
          },
          0
        )
        .fromTo(
          "#hide-menu",
          { x: 0 },
          {
            x: 250,
          },
          0
        );

      setTween(tl);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
        style={hide ? { opacity: 0 } : { opacity: 1 }}
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
            onClick={() => dispatch(selectMenu("overlay"))}
          >
            <h4
              className={styles.link}
              onMouseEnter={() => {
                mouseIn("overlay", "オーバレイ");
              }}
              onMouseLeave={() => {
                mouseOut("overlay", "Overlay");
              }}
              ref={ref}
              id="overlay"
            >
              Overlay
            </h4>
          </span>
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
                mouseIn("mod-controls", "コントロールパネル");
              }}
              onMouseLeave={() => {
                mouseOut("mod-controls", "Mod Control Room");
              }}
              ref={ref}
              id="mod-controls"
            >
              Mod Control Room
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
