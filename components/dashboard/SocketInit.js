import React from "react";
import { server } from "../../config";
import io from "socket.io-client";
import { useEffect } from "react";
const socket = io();

export const SocketInit = () => {
  useEffect(() => {
    socket.emit("init");
  }, []);
};
