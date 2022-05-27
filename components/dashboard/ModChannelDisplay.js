import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/dashboard.module.css";
import { addSocket, eraseSocket } from "../../redux/actions/socketSlice";
import { useSession } from "next-auth/react";
import SocketIOClient from "socket.io-client";
import { server } from "../../config";

const ModChannelDisplay = ({ joinChannel, streamerChannels, user }) => {
  const [streamers, setStreamers] = useState(user?.modFor[0]);
  const [socket, setSocket] = useState(null);
  const [connection, setConnection] = useState(false);
  const dispatch = useDispatch();
  const session = useSession();
  const [mods, setMods] = useState([]);
  const [roomOpen, setRoomOpen] = useState(false);
  const [streamerOnline, setStreamerOnline] = useState(false);
  const username = user.name;
  const modarray = user.mods;
  const modFor = user.modFor;
  const displayName = user.streamer ? user.name : user.modFor[0];

  useEffect(() => {
    const socket = SocketIOClient.connect(server, {
      path: "/api/socket",
      autoConnect: false,
      reconnectionAttempts: 5,
      rejectUnauthorized: false,
    });

    setSocket(socket);

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  useEffect(
    () => {
      // log socket connection
      socket?.on("connect", () => {
        const username = session.data.name;
        console.log("SOCKET CONNECTED!", socket.id);
        setConnection(true);
        dispatch(addSocket({ socket }));

        socket?.emit("room", session.data, username);
        if (!mods.includes(username)) {
          setMods([...mods, username]);
        }
      });

      socket?.on("connect_error", (err) => {
        console.log("Error:", err.message);
      });

      socket?.on("sign-off", (test) => {
        console.log(test);
      });

      socket?.on("logged-in", (user, username, streamerOnline, usersOnline) => {
        console.log(`Streamer online? ${streamerOnline}`);
        setMods([username, ...usersOnline]);
        setStreamerOnline(streamerOnline);
      });

      socket?.on("logged-off", (usersOnline, streamerOnline) => {
        setMods(usersOnline);
        setStreamerOnline(streamerOnline);
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [socket]
  );

  const disconnectHandler = async () => {
    const username = session.data.name;
    let streamerStatus = true;
    if (session.data.streamer) {
      streamerStatus = false;
    }
    await socket?.emit("user-sign-off", session.data, username, streamerStatus);
    dispatch(eraseSocket());
    setConnection(false);
    socket.disconnect();
  };

  const connectToServer = async (option) => {
    if (option === "connect") {
      await socket.connect();
    } else {
      disconnectHandler();
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

      <div className={styles.modStatusContainer}>
        <h5 className={styles.modStatusHeader}>{displayName}</h5>
        {connection ? (
          <>
            <p
              className={
                streamerOnline ? styles.modStatusOpen : styles.modStatusClose
              }
            >
              Streamer is currently: {streamerOnline ? "Online" : "Offline"}
            </p>
            <ul className={styles.userList}>
              {mods.map((mod) => {
                return <li key={mod}>{mod}</li>;
              })}
            </ul>
          </>
        ) : (
          <div className={styles.offlineModsContainer}>
            <p>You are currently offline</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModChannelDisplay;
