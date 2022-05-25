import React from "react";
import styles from "../../styles/dashboard.module.css";

const Dashboard = ({ socket }) => {
  return (
    <div className={styles.dashboardContainer}>
      <div>
        <button
          onClick={() => {
            socket.emit("test");
          }}
        >
          Socket Test
        </button>
      </div>
      Dashboard
    </div>
  );
};

export default Dashboard;
