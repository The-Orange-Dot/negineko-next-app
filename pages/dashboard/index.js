import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import styles from "../../styles/dashboard.module.css";
import Toolbar from "../../components/dashboard/Toolbar";
import { useSelector, useDispatch } from "react-redux";
import Giveaway from "../../components/giveaway/Giveaway";
import { selectMenu } from "../../redux/actions/juiceboxMenuSlice";

const Dashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const juiceBoxMenu = useSelector((state) => state.juicebox.menu);
  const session = useSession();
  const router = useRouter();

  console.log(juiceBoxMenu);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      console.log("Unauthorized");
      router.push("/auth/signin");
    }
  }, [router, session]);

  //If toolbar menu is selected
  let screen;
  if (juiceBoxMenu === "dashboard") {
    screen = <div className={styles.dashboardContainer}>Dashboard</div>;
  } else if (juiceBoxMenu === "giveaway") {
    screen = <Giveaway />;
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
  }
};

export default Dashboard;
