import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/dashboard.module.css";
import { addSocket, eraseSocket } from "../../redux/actions/socketSlice";
import { useSession } from "next-auth/react";
import SocketIOClient from "socket.io-client";
import { server } from "../../config";

const ModChannelDisplay = ({
  joinChannel,
  roomStatus,
  streamerChannels,
  mods,
  user,
}) => {
  const [streamers, setStreamers] = useState(user.modFor[0]);
  const [socket, setSocket] = useState({});
  const [connection, setConnection] = useState(false);
  const dispatch = useDispatch();
  const session = useSession();

  useEffect(() => {
    const socket = SocketIOClient.connect(server, {
      path: "/api/socket",
      autoConnect: false,
    });

    setSocket(socket);

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnection(true);
      dispatch(addSocket({ socket }));
    });

    socket.on("created", (msg) => {
      console.log(msg);
    });

    socket.on("room-created", (msg) => {
      console.log(msg);
    });

    socket.on("test-res", (msg) => {
      console.log(msg);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();

    setSocket(socket);
  }, []);

  let streamer;
  if (streamers !== "") {
    streamer = (
      <div className={styles.streamerContainer}>
        <h5>Streamer Channels</h5>
        <div className={styles.streamerRoom}>
          {streamers}
          <button
            onClick={() => joinChannel()}
            className={styles.modStatusOpenButton}
          >
            Connect
          </button>
        </div>
      </div>
    );
  }

  const connectToServer = async (option) => {
    if (option === "connect") {
      await socket.connect();

      await fetch("/api/streamerSocket", {
        method: "POST",
        body: JSON.stringify(session.data.user.name.toLowerCase()),
      });
    } else {
      socket.disconnect();
      dispatch(eraseSocket());
      setConnection(false);
    }
  };

  let connectServerButton;
  if (connection) {
    connectServerButton = (
      <button
        className={styles.modStatusOpenButton}
        onClick={() => {
          connectToServer("disconnect");
        }}
      >
        Leave server
      </button>
    );
  } else {
    connectServerButton = (
      <button
        className={styles.modStatusOpenButton}
        onClick={() => {
          connectToServer("connect");
        }}
      >
        Connect to server
      </button>
    );
  }

  return (
    <div className={styles.statusContainer}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {connectServerButton}
      </div>
      {user.mod ? streamer : null}

      <div className={styles.modStatusContainer}>
        <h5 className={styles.modStatusHeader}>Mod Channel</h5>
        <p className={styles.modStatus}>Status: {roomStatus}</p>
        {roomStatus === "open" ? (
          <button
            className={styles.modStatusOpenButton}
            onClick={() => streamerChannels("open")}
          >
            Close Channel
          </button>
        ) : user.streamer ? (
          <button
            className={styles.modStatusOpenButton}
            onClick={() => streamerChannels("close")}
          >
            Open Channel
          </button>
        ) : null}
        {mods}
      </div>
    </div>
  );
};

export default ModChannelDisplay;
