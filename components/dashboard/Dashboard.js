import React, { useEffect } from "react";
import { useState } from "react";
import { server } from "../../config";
import styles from "../../styles/dashboard.module.css";
import SocketIOClient from "socket.io-client";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { addSocket, eraseSocket } from "../../redux/actions/socketSlice";

const Dashboard = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const [connection, setConnection] = useState(false);
  const [testText, setTestText] = useState([]);
  const [socket, setSocket] = useState({});
  // connect to socket server
  console.log(socket);

  // useEffect(() => {
  //   const socket = SocketIOClient.connect(server, {
  //     path: "/api/socket",
  //     autoConnect: false,
  //   });

  //   setSocket(socket);

  //   // log socket connection
  //   socket.on("connect", () => {
  //     console.log("SOCKET CONNECTED!", socket.id);
  //     setConnection(true);
  //   });

  //   socket.on("created", (msg) => {
  //     console.log(msg);
  //   });

  //   socket.on("room-created", (msg) => {
  //     console.log(msg);
  //   });

  //   socket.on("test-res", (msg) => {
  //     console.log(msg);
  //   });

  //   // socket disconnet onUnmount if exists
  //   if (socket) return () => socket.disconnect();
  //   setSocket(socket);
  // }, [testText, dispatch]);

  const test = async () => {
    dispatch(addSocket(socket));

    if (!socket || socket.connected === false) {
      await socket.connect();

      await fetch("/api/streamerSocket", {
        method: "POST",
        body: JSON.stringify(session.data.user.name.toLowerCase()),
      });
    }
  };

  const joinRoom = async () => {
    socket.disconnect();
    dispatch(eraseSocket());
  };

  return (
    <div className={styles.dashboardContainer}>
      <div>
        <button
          onClick={() => {
            test();
          }}
        >
          Connect
        </button>
        <button
          onClick={() => {
            joinRoom();
          }}
        >
          Disconnect
        </button>
      </div>
      Dashboard
      <div>
        {testText.map((text) => {
          return <p key={text}>{text}</p>;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
