import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/dashboard.module.css";
import { useSession } from "next-auth/react";
import SocketIOClient from "socket.io-client";
import { server } from "../../config";
import {
  addButton,
  deleteButton,
  setScreenColor,
  setTextColor,
  syncButtons,
} from "../../redux/actions/giveawaySlice";
import { connected, disconnected } from "../../redux/actions/socketSlice";
import {
  selectButton,
  winnerSelected,
  winner,
  selectTimer,
} from "../../redux/actions/giveawaySlice";
import { ShufflePress } from "../giveaway/ShufflePress";
import { toggleMenu } from "../../redux/actions/hideMenuSlice";
import { fetchModNames } from "../FetchMods";
import { storeMods } from "../../redux/actions/modSlice";

const ModChannelDisplay = ({ user }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const session = useSession();
  const [mods, setMods] = useState([]);
  const [streamerOnline, setStreamerOnline] = useState(false);
  const displayName = user?.streamer ? user?.name : user?.modFor;
  const [connection, setConnection] = useState(false);
  // const connection = useSelector((state) => state.socket.connected);
  const buttons = useSelector((state) => state.giveaway.buttons);
  const raffleButtons = useSelector((state) => state.giveaway.buttons);

  useEffect(() => {
    const socket = SocketIOClient.connect(server, {
      path: "/api/socket",
      autoConnect: false,
      reconnectionAttempts: 5,
      rejectUnauthorized: false,
      withCredentials: true,
      secure: true,
    });

    setSocket(socket);

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  console.log(session.data.modFor);

  useEffect(
    () => {
      // log socket connection
      socket?.on("connect", async () => {
        const user = session.data;
        const mods = await fetchModNames(user.name);

        console.log(mods);

        console.log("SOCKET CONNECTED!", socket.id);
        setConnection(true);
        socket?.emit("room", mods, user);
        setMods([...mods, user.name]);
        dispatch(storeMods(mods));
        dispatch(connected());
        console.log(connection);
      });

      socket?.on("connect_error", (err) => {
        console.log("Error:", err.message);
      });

      socket?.on("res-add-button", (newButton) => {
        dispatch(addButton(newButton));
      });

      socket?.on("res-delete-button", (updatedButtons) => {
        dispatch(deleteButton(updatedButtons));
        dispatch(selectButton({}));
      });

      socket?.on("logged-in", (user, username, streamerOnline, usersOnline) => {
        console.log(`Streamer online: ${streamerOnline}`);
        setMods([username, ...usersOnline]);
        setStreamerOnline(streamerOnline);
      });

      socket?.on("logged-off", (usersOnline, streamerOnline) => {
        setMods(usersOnline);
        setStreamerOnline(streamerOnline);
      });

      socket?.on("res-selected-button", (selectedButton) => {
        dispatch(selectButton(selectedButton));
      });

      socket?.on("res-hide-menu", (hideOverlay) => {
        dispatch(toggleMenu(hideOverlay));
      });

      socket?.on("req-buttons", (requester) => {
        fetch("/api/raffleSocket", {
          method: "POST",
          body: JSON.stringify({
            emit: "sync-buttons-res",
            requester: requester,
            buttons: buttons,
          }),
        });
      });

      socket?.on("res-text-color", (textColor) => {
        dispatch(setTextColor(textColor));
      });

      socket?.on("res-timer-selected", (timer) => {
        dispatch(selectTimer(timer));
      });

      socket?.once("res-buttons", (buttons) => {
        dispatch(syncButtons(buttons));
      });

      socket?.on("res-shuffle", (body) => {
        const parsedBody = JSON.parse(body);
        const winner = parsedBody.winnerName;
        const timer = parsedBody.timer;
        const sentSelectedButton = parsedBody.selectedButton;
        ShufflePress(
          raffleButtons,
          sentSelectedButton,
          timer,
          dispatch,
          winner
        );
      });

      socket?.on("res-reset", () => {
        dispatch(selectButton({}));
        dispatch(winnerSelected(false));
        dispatch(winner(""));
      });

      socket?.on("res-screen-color", (color) => {
        dispatch(setScreenColor(color));
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
    await socket?.emit(
      "user-sign-off",
      [...mods, username],
      username,
      streamerStatus
    );
    setConnection(false);
    dispatch(disconnected());

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
