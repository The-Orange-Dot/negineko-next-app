import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/dashboard.module.css";
import Toolbar from "../../components/dashboard/Toolbar";
import { useSelector, useDispatch } from "react-redux";
import Giveaway from "../../components/giveaway/Giveaway";
import Settings from "../../components/dashboard/Settings";
import Dashboard from "../../components/dashboard/Dashboard";
import ModControls from "../../components/dashboard/ModControls";
import { hideMenu, showMenu } from "../../redux/actions/hideMenuSlice";
import { useEffect } from "react";

const Home = () => {
  const darkMode = useSelector((state) => state?.darkMode?.value);
  const juiceBoxMenu = useSelector((state) => state?.juicebox?.menu);
  const hide = useSelector((state) => state.hideMenu.value);
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [tween, setTween] = useState();

  const hideMenuHandler = () => {
    if (hide) {
      dispatch(showMenu());
    } else {
      dispatch(hideMenu());
    }
  };

  //If toolbar menu is selected
  let screen;
  if (juiceBoxMenu === "dashboard") {
    screen = <Dashboard />;
  } else if (juiceBoxMenu === "giveaway") {
    screen = <Giveaway />;
  } else if (juiceBoxMenu === "settings") {
    screen = <Settings />;
  } else if (juiceBoxMenu === "mod-controls") {
    screen = <ModControls />;
  }

  if (session.status === "loading") {
    return (
      <div className={styles.dashboardContainer}>
        <div className={darkMode ? styles.darkBackground : styles.background} />
        <h1>Loading...</h1>
      </div>
    );
  } else if (session.status === "authenticated") {
    return (
      <>
        <Toolbar tween={tween} setTween={setTween}>
          <div
            className={
              darkMode ? styles.darkHideMenuButton : styles.hideMenuButton
            }
            onClick={() => {
              hideMenuHandler();
              tween.resume(0);
            }}
            id="hide-menu"
          >
            Hide menu
          </div>
          <div
            className={darkMode ? styles.darkBackground : styles.background}
          />
          {screen}
        </Toolbar>
      </>
    );
  } else if (session.status === "unauthenticated") {
    console.log("Unauthorized");
    router.push("/auth/signin");
  }
};

export default Home;
