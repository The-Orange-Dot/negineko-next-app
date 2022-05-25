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

    io.on("connection", (socket) => {
      clients++;
      console.log(`${clients} clients connected - ${socket.id} has joined`);

      socket.on("room", (user: any) => {
        const room = user.name.toLowerCase();
        const announce = user.modFor[0];
        socket.join(room);
        console.log(room);

        if (announce) {
          io.to(announce).emit("logged-in", room);
        }
      });

      socket.on("disconnect", () => {
        clients--;
        console.log(`${clients} clients connected - ${socket.id} has left`);
      });

      socket.on("join-streamer-channel", (streamer: string, user: string) => {
        const room = streamer.toLowerCase().trim();

        socket.join(room);
        console.log(io.sockets.adapter.rooms.get(room));

        //Notifies and updates everyone EXCEPT SENDER when joining
        io.sockets
          .to(room)
          .emit("mod-joined", user, `${user} has joined the room`);

        //Notifies SELF when joining
        socket.emit("mod-joined", user, `${user} has joined the room`);
        // console.log(io.sockets.adapter.rooms.get(room));
        console.log(io.sockets.adapter.rooms);
      });

      socket.on("shuffle", (room: string, res: any) => {
        socket.to(room).emit("shuffle-res", "broadcast-test");
      });

      socket.on(
        "add-button",
        (users: any, descriptions: any, mods: string[]) => {
          console.log(mods);
          mods.map((mod) => {
            socket
              .to(mod.toLowerCase())
              .emit("sent-buttons", users, descriptions);
          });
        }
      );
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }

  res.end();
};

export default SocketHandler;
