import { Server } from "socket.io";
import { Server as net } from "http";
import prisma from "../../../lib/prisma";
import { server } from "../../../config";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("input", (msg) => {
        socket.broadcast.emit("update", msg);
      });

      socket.on("items", (items) => {
        socket.broadcast.emit("items", items);

        console.log(items);
      });
    });
  }
  res.end();
};

export default SocketHandler;
