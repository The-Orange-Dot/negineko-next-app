// export const getStaticProps = async () => {
//   //Gets OAuth token from Twitch
//   const token = await fetch(
//     `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=viewing_activity_read+moderation%3Aread`,
//     {
//       method: "POST",
//     }
//   );

//   const tokenParsed = await token.json();
//   //Fetches Negi and Orange's data from Twitch
//   const res = await fetch(
//     "https://api.twitch.tv/helix/users?login=negineko_tokyo&login=the_orange_dot",
//     {
//       headers: {
//         Authorization: `Bearer ${tokenParsed.access_token}`,
//         "Client-Id": ${process.env.TWITCH_CLIENT_ID},
//       },
//     }
//   );

//   const data = await res.json();
//   return {
//     props: { user: data },
//   };
// };

import React, { useEffect } from "react";
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
import Overlay from "../../components/dashboard/Overlay";
import OverlaySpeedDial from "../../components/Overlay/OverlaySpeedDial.tsx";
import OverlayTextControlPanel from "../../components/Overlay/OverlayTextControlPanel";
import { hideMenu, showMenu } from "../../redux/actions/hideMenuSlice";
import { useMediaQuery } from "react-responsive";
import { setUserData } from "../../redux/actions/userLoginSlice";

const Home = () => {
  const darkMode = useSelector((state) => state?.darkMode?.value);
  const juiceBoxMenu = useSelector((state) => state?.juicebox?.menu);
  const hide = useSelector((state) => state.hideMenu.value);
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [tween, setTween] = useState();
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
  }, [isMobile]);

  useEffect(
    () => {
      let streamer;

      if (session.data) {
        if (session.data.mod) {
          streamer = session.data.modFor;
        } else if (session.data.streamer) {
          streamer = session.data.name;
        } else {
          streamer = "";
        }
      }

      fetch(`api/users/${streamer}`, {
        method: "POST",
        headers: { key: "orange_is_orange" },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setUserData(data));
        });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [session]
  );

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
    screen = <Settings juiceBoxMenu={juiceBoxMenu} />;
  } else if (juiceBoxMenu === "mod-controls") {
    screen = <ModControls />;
  } else if (juiceBoxMenu === "overlay") {
    screen = (
      <>
        <OverlaySpeedDial />
        <OverlayTextControlPanel />
      </>
    );
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
          {mobile ? null : (
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
              {hide ? "Show menu" : "Hide menu"}
            </div>
          )}
          <div
            className={darkMode ? styles.darkBackground : styles.background}
          />
        </Toolbar>
        {juiceBoxMenu === "giveaway" || juiceBoxMenu === "overlay" ? (
          <Overlay>{screen}</Overlay>
        ) : (
          screen
        )}
      </>
    );
  } else if (session.status === "unauthenticated") {
    console.log("Unauthorized");
    router.push("/auth/signin");
  }
};

export default Home;
