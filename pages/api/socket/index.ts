import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../source/types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { server } from "../../../config";

export const config = {
  api: {
    bodyParser: false,
  },
};

let clients: number = 0;

const SocketHandler = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
      cors: {
        origin: "*:*",
        methods: ["GET", "POST"],
      },
      transports: ["polling"],
      allowEIO3: true,
    });

    httpServer.listen(8885);

    io.on("connection", (socket) => {
      clients++;
      console.log(`${clients} clients connected - ${socket.id} has joined`);

      socket.on("disconnect", () => {
        clients--;
        console.log(`${clients} clients connected - ${socket.id} has left`);
      });

      socket.on("create-room", (user: string) => {
        const room = user.toLowerCase();

        socket.join(room);
        console.log(room);
        socket.emit("test", `You've created a room - ${user}`);
        console.log(io.sockets.adapter.rooms.get(room));
      });

      socket.on("join-streamer-channel", (streamer, user) => {
        const room = streamer.toLowerCase().trim();

        socket.join(room);

        //Notifies and updates everyone EXCEPT SENDER when joining
        io.sockets
          .to(room)
          .emit("mod-joined", user, `${user} has joined the room`);

        //Notifies SELF when joining
        socket.emit("mod-joined", user, `${user} has joined the room`);
        console.log(io.sockets.adapter.rooms.get(room));
      });
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }

  res.end();
};

export default SocketHandler;
