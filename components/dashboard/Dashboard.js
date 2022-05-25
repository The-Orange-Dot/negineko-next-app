import React, { useEffect } from "react";

import styles from "../../styles/dashboard.module.css";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { connected, disconnected } from "../../redux/actions/socketSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.value.socket);
  const connection = useSelector((state) => state.socket.connected);
  const session = useSession();

  useEffect(() => {
    if (socket?.connected === true) {
      dispatch(connected());
      console.log(`Connection: ${connection}`);
    } else {
      dispatch(disconnected());
      console.log(`Connection: ${connection}`);
    }
  }, [socket, connection, dispatch]);

  return (
    <div className={styles.dashboardContainer}>
      {session?.data?.user?.name}&apos;s Dashboard
    </div>
  );
};

export default Dashboard;
