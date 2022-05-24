import { Server } from "Socket.IO";
import prisma from "../../../lib/prisma";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");

    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
