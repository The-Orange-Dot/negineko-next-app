import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import Toolbar from "../../components/dashboard/Toolbar";
import { useSelector, useDispatch } from "react-redux";
import Giveaway from "../../components/giveaway/Giveaway";
import Settings from "../../components/dashboard/Settings";
import Dashboard from "../../components/dashboard/Dashboard";
import ModControls from "../../components/dashboard/ModControls";
import { io } from "socket.io-client";
import { server } from "../../config";
const socket = io();

const Home = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const juiceBoxMenu = useSelector((state) => state.juicebox.menu);
  const session = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });

    socket.on("connect_error", (error) => {
      console.log(error);
    });
  }, []);

  //If toolbar menu is selected
  let screen;
  if (juiceBoxMenu === "dashboard") {
    screen = <Dashboard socket={socket} />;
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
      <Toolbar>
        <div className={darkMode ? styles.darkBackground : styles.background} />
        {screen}
      </Toolbar>
    );
  } else if (session.status === "unauthenticated") {
    console.log("Unauthorized");
    router.push("/auth/signin");
  }
};

export default Home;
