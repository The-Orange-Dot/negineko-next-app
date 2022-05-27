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
  const [socket, setSocket] = useState({});
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
    });

    setSocket(socket);

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnection(true);
      dispatch(addSocket({ socket }));
      socket?.emit("room", session.data);
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

    socket.on("test", (msg) => {
      console.log(msg);
    });

    socket?.on("logged-in", (user, streamerOnline) => {
      console.log(`Streamer online? ${streamerOnline}`);
      if (user.streamer) {
        setRoomOpen(true);
      } else {
        if (streamerOnline) {
          console.log(`${user} just logged in`);
          setStreamerOnline(streamerOnline);
        }
      }
    });

    socket.on("mod-joined", (mod, msg) => {
      setMods([...mods, mod]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const connectToServer = async (option) => {
    if (option === "connect") {
      await socket.connect();
      socket.emit(
        "join-streamer-channel",
        [username, ...modarray, ...modFor],
        username
      );

      if (!mods.includes(username)) {
        setMods([...mods, username]);
      }
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

  // const createStreamerChannel = (option) => {
  //   if (socket?.connected === true) {
  //     if (option === "open") {
  //       socket?.emit("create-room", session.data.user.name);
  //       setRoomStatus("open");
  //     }
  //   }
  // };

  // const joinStreamerChannel = () => {
  //   const modFor = session?.data?.modFor[0];
  //   const user = session?.data?.user?.name;

  //   if (modFor) {
  //     socket?.emit("join-streamer-channel", modFor, user);
  //   } else {
  //     console.log("You currently don't mod for anyone");
  //   }
  // };

  let streamer;
  // if (streamers !== "") {
  //   streamer = (
  //     <div className={styles.streamerContainer}>
  //       <h5>Streamer Channels</h5>
  //       <div className={styles.streamerRoom}>
  //         {streamers}
  //         <button
  //           onClick={() => joinStreamerChannel()}
  //           className={styles.modStatusOpenButton}
  //         >
  //           Connect
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.statusContainer}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {connectServerButton}
      </div>
      {user.mod ? streamer : null}

      <div className={styles.modStatusContainer}>
        <h5 className={styles.modStatusHeader}>{displayName} Mods Connected</h5>
        <p className={styles.modStatus}>
          Room Status: {streamerOnline || roomOpen ? "Open" : "Closed"}
        </p>

        {mods}
      </div>
    </div>
  );
};

export default ModChannelDisplay;
