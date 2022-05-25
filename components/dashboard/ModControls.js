import React from "react";
import styles from "../../styles/modControls.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const ModControls = () => {
  const socket = useSelector((state) => state.socket.value.socket);
  const session = useSession();

  useEffect(() => {}, [socket]);

  return (
    <div className={styles.modControlsPageContainer}>
      ModControls
      <button
        onClick={() => {
          if (socket?.connected === true) {
            socket?.emit("test-req");
            socket?.emit("create-room", session.data.user.name);
          }
        }}
      >
        Shuffle
      </button>
    </div>
  );
};

export default ModControls;
