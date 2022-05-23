import React, { useRef, useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import Link from "next/link";
import { mouseIn, mouseOut } from "../NavBarAnimation";
import gsap from "gsap";
import Switch from "../Switch";
import { useDispatch, useSelector } from "react-redux";
import { darkModeOn, darkModeOff } from "../../redux/actions/darkModeSlice";

const Toolbar = ({ children }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [tween, setTween] = useState();
  const [animState, setAnimState] = useState(false);
  const [value, setValue] = useState(darkMode);
  const darkMode = useSelector((state) => state.darkMode.value);

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

  if (value === true) {
    dispatch(darkModeOn());
    localStorage.setItem("darkMode", true);
  } else if (value === false) {
    dispatch(darkModeOff());
    localStorage.setItem("darkMode", false);
  }

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

        <div className={styles.streamerToolsContainer}>
          <h3 style={{ textAlign: "center" }}>Streamer Tools</h3>
          <span className={styles.selector} style={{ cursor: "pointer" }}>
            <Link href="/dashboard/giveaway" passHref={true}>
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
          </span>
        </div>
        <div className={styles.modToolsContainer}>
          <h3 style={{ textAlign: "center" }}>Mod tools</h3>
        </div>
        <div className={styles.darkMode}>
          <h5>Dark Mode</h5>
          <Switch
            isOn={darkMode}
            handleToggle={() => setValue(!value)}
            onColor={"#06D6A0"}
          />
        </div>
      </div>

      <>{children}</>
    </>
  );
};

export default Toolbar;
