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
import io from "socket.io-client";
import { server } from "../../config";
let socket;

const Home = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const juiceBoxMenu = useSelector((state) => state.juicebox.menu);
  const session = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // await fetch("/api/socket");
    // socket = io();
    // console.log(socket.connected);
    // socket.on("connect", () => {
    //   console.log("connected");
    // });
    // socket.on("update", (msg) => {
    //   console.log(msg);
    // });
    // socket.on("items", (items) => {
    //   console.log(items);
    // });
  };

  //If toolbar menu is selected
  let screen;
  if (juiceBoxMenu === "dashboard") {
    screen = <Dashboard />;
  } else if (juiceBoxMenu === "giveaway") {
    screen = <Giveaway socket={socket} />;
  } else if (juiceBoxMenu === "settings") {
    screen = <Settings />;
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
