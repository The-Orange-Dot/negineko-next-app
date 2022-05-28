import { NextApiRequest } from "next";
import { io } from "socket.io-client";
import { NextApiResponseServerIO } from "../../source/types/next";

const raffleSocket = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const socket = res?.socket?.server?.io;
    const body = JSON.parse(req.body);
    const mods = body.mods;

    if (body.emit === "add-button") {
      const newButton = body.button;

      mods.map((mod: string) => {
        socket.to(mod.toLowerCase()).emit("res-add-button", newButton);
      });
    } else if (body.emit === "delete-button") {
      const newButton = body.button;

      mods.map((mod: string) => {
        socket.to(mod.toLowerCase()).emit("res-delete-button", newButton);
      });
    } else if (body.emit === "sync-buttons-req") {
      mods.map((mod: string, requester: string) => {
        socket.to(mod.toLowerCase()).emit("req-buttons", requester);
      });
    } else if (body.emit === "sync-buttons-res") {
      const requester = body.requester.toLowerCase();
      const buttons = body.buttons;
      socket.to(requester).emit("res-buttons", buttons);
    }

    res.end();
  }
};

export default raffleSocket;
