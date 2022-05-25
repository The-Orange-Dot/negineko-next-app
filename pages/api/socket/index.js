import { Server } from "socket.io";
import { server } from "../../../config";
import prisma from "../../../lib/prisma";

const SocketHandler = async (req, res) => {
  let io;
  //Will connect to sockets when loading in
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    io = new Server(res.socket.server, {
      cors: {
        origin: server,
        methods: ["GET", "POST"],
      },
    });
    res.socket.server.io = io;
  } else {
    io = res.socket.server.io;
  }
  io.setMaxListeners(0);
  let host;

  io.once("connection", (socket) => {
    socket.on("create-room", (user) => {
      host = user;
      socket.join(host);
      socket.broadcast.emit("created", `${host} has created a new room.`);
    });

    socket.on("test", () => {
      console.log("Testing...");
    });

    socket.on("join-room", async (user) => {
      const userSearch = await prisma.user.findFirst({
        where: { name: user },
      });

      const streamer = await prisma.user.findFirst({
        where: { name: { equals: userSearch.modFor[0], mode: "insensitive" } },
      });

      socket.join(streamer.name);
      socket.broadcast.emit("mod-joined", userSearch.name);
    });
  });
  res.end();
};

export default SocketHandler;
