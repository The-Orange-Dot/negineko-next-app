import { Server } from "socket.io";
import prisma from "../../../lib/prisma";
import { server } from "../../../config";

const SocketHandler = async (req, res) => {
  let io;
  //Will connect to sockets when loading in
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    io = new Server(res.socket.server, {
      cors: {
        origin: server,
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: false,
      },
    });
    res.socket.server.io = io;
  } else {
    console.log("Socket is already running");
    io = await res.socket.server.io;
  }
  io.setMaxListeners(0);
  let host;

  io.on("connection", (socket) => {
    socket.on("create-room", (user) => {
      host = user;
      socket.join(host);
      socket.broadcast.emit("created", `${host} has created a new room.`);
    });

    socket.once("init", () => {
      console.log("Connected");
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
