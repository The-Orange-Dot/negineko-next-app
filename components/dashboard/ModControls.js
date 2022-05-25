import React from "react";
import styles from "../../styles/modControls.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const ModControls = () => {
  const socket = useSelector((state) => state.socket.value.socket);
  const session = useSession();

  useEffect(() => {
    socket?.on("confirmation", () => {
      console.log("SHUFFLING!!");
    });

    socket?.on("sent-buttons", (users, descriptions) => {
      console.log(users);
      console.log(descriptions);
    });
  }, [socket]);

  return (
    <div className={styles.modControlsPageContainer}>
      ModControls
      <button
        onClick={() => {
          if (socket?.connected === true) {
            console.log("clicked");
            const room = session?.data?.modFor[0];
          }
        }}
      >
        Shuffle
      </button>
    </div>
  );
};

export default ModControls;
