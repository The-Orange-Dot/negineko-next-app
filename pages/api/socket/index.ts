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
      transports: ["polling", "websocket"],
      allowEIO3: true,
    });

    io.on("connection", (socket) => {
      clients++;
      console.log(`${clients} clients connected - ${socket.id} has joined`);
      socket.on("disconnect", () => {
        clients--;
        console.log(`${clients} clients connected - ${socket.id} has left`);
      });

      //FIRES WHEN USER LOGS IN
      socket.on("room", async (user: any, username: string) => {
        const rooms = [...user.mods, ...user.modFor];
        await socket.join(user.name.toLowerCase());

        let streamerOnline: boolean = false;

        let usersOnline = [];

        //checks who's online
        rooms.map((room) => {
          if (io.sockets.adapter.rooms.get(room.toLowerCase())) {
            usersOnline.push(room);
          }
        });

        if (user.streamer || usersOnline.includes(user.modFor[0])) {
          streamerOnline = true;
        }

        rooms.map((room) => {
          socket
            .to(room.toLowerCase())
            .emit("logged-in", user, username, streamerOnline, usersOnline);
        });
        socket.emit("logged-in", user, username, streamerOnline, usersOnline);
      });

      //FIRES WHEN USER LOGS OFF
      socket.on(
        "user-sign-off",
        async (user: any, username: string, streamerStatus: boolean) => {
          const rooms = [...user.mods, ...user.modFor];
          let usersOnline = [];

          //checks who's online
          rooms.map((room) => {
            if (io.sockets.adapter.rooms.get(room.toLowerCase())) {
              if (room.toLowerCase() !== username.toLowerCase()) {
                usersOnline.push(room);
              }
            }
          });

          rooms.map((room) => {
            socket
              .to(room.toLowerCase())
              .emit("logged-off", usersOnline, streamerStatus);
          });
          socket.emit("logged-off", usersOnline, streamerStatus);

          socket.leave(username.toLowerCase());
        }
      );

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
