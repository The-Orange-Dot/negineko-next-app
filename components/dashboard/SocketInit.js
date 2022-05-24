import React from "react";
import { server } from "../../config";
import io from "socket.io-client";
import { useEffect } from "react";

const ws = server.replace(/^http/, "wss");
const socket = io(ws, {
  path: "/api/socket",
  transports: ["Websocket"],
  withCredentials: true,
});

export const SocketInit = () => {
  useEffect(() => {
    socket.emit("init");
  }, []);
};
