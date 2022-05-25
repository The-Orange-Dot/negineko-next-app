import React, { useEffect } from "react";
import { useState } from "react";
import { server } from "../../config";
import styles from "../../styles/dashboard.module.css";
var io = require("socket.io-client");
import SocketIOClient from "socket.io-client";

const Dashboard = () => {
  const [connection, setConnection] = useState(false);
  const [testText, setTestText] = useState([]);

  useEffect(() => {
    // connect to socket server
    const socket = SocketIOClient.connect(server, {
      path: "/api/socket",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnection(true);
    });

    // // update chat on new message dispatched
    // socket.on("message", (message) => {
    //   chat.push(message);
    //   setChat([...chat]);
    // });

    socket.on("test", (msg) => {
      console.log(msg);
      setTestText([...testText, msg]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const test = async () => {
    await fetch("/api/test");
  };

  return (
    <div className={styles.dashboardContainer}>
      <div>
        <button
          onClick={() => {
            test();
          }}
        >
          Socket Test
        </button>{" "}
        <button onClick={() => {}}>connect Test</button>
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
