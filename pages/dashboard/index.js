import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import styles from "../../styles/dashboard.module.css";
import Toolbar from "../../components/dashboard/Toolbar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      console.log("Unauthorized");
      router.push("/auth/signin");
    }
  }, [router, session]);

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
        <div className={styles.dashboardContainer}>
          <div
            className={darkMode ? styles.darkBackground : styles.background}
          />
          Dashboard
        </div>
      </Toolbar>
    );
  }
};

export default Dashboard;
