import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../source/types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { server } from "../../../config";

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
        origin: server,
      },
      allowEIO3: true,
    });

    io.on("connection", (socket) => {
      clients++;
      console.log(`${clients} clients connected - ${socket.id} has joined`);

      socket.on("room", (user: any) => {
        const room = user.name.toLowerCase();
        const announce = user.modFor[0] || room;
        socket.join(room);

        console.log(announce);

        let streamerOnline: boolean;

        io.sockets.adapter.rooms.get("negineko_tokyo")
          ? (streamerOnline = true)
          : (streamerOnline = false);

        if (announce) {
          io.to(announce).emit("logged-in", room, streamerOnline);
        }
      });

      socket.on("disconnect", () => {
        clients--;
        console.log(`${clients} clients connected - ${socket.id} has left`);
      });

      socket.on("join-streamer-channel", (mods: any[], user: any) => {
        console.log(io.sockets.adapter.rooms.get(user.toLowerCase()));

        mods.map((mod) =>
          socket
            .to(mod.toLowerCase())
            .emit("mod-joined", user, `${user} has joined the room`)
        );
      });

      socket.on("shuffle", (rooms: any[]) => {
        rooms.map((room) =>
          socket.to(room.toLowerCase()).broadcast.emit("res-shuffle")
        );
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

      socket.on("item-selected", (key: string, mods: string[]) => {
        mods.map((mod) => {
          socket.to(mod.toLowerCase()).emit("sent-keys", key);
        });
      });

      socket.on("req-reset", (mods: string[]) => {
        mods.map((mod) => {
          socket.to(mod?.toLowerCase()).emit("res-reset");
        });
      });

      socket.on(
        "req-timer",
        (timer: number[], selector: string, mods: string[]) => {
          mods.map((mod) => {
            socket.to(mod.toLowerCase()).emit("res-timer", timer, selector);
          });
        }
      );

      socket.on("req-delete-button", (key: string, users: string[]) => {
        users.map((user) => {
          socket.to(user.toLowerCase()).emit("res-delete-button", key);
        });
      });
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }

  res.end();
};

export default SocketHandler;
