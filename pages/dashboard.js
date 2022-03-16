import Link from "next/link";
import React from "react";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link href="/income" passHref={true}>
        <div className={styles.secret}></div>
      </Link>
    </div>
  );
};

export default Dashboard;
