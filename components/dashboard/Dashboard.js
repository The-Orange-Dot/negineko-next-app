import React, { useEffect } from "react";
import styles from "../../styles/dashboard.module.css";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const connection = useSelector((state) => state.socket.connected);
  const session = useSession();

  useEffect(
    () => {
      console.log(`Server connection: ${connection}`);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [connection]
  );

  return (
    <div className={styles.dashboardContainer}>
      {session?.data?.user?.name}&apos;s Dashboard
    </div>
  );
};

export default Dashboard;
