import React from "react";
import { server } from "../../config";
import io from "socket.io-client";
import { useEffect } from "react";
const socket = io(server, {
  transports: ["websocket"],
  path: "/api/socket",
  withCredentials: true,
});

export const SocketInit = () => {
  useEffect(() => {
    socket.emit("init");
  }, []);
};
