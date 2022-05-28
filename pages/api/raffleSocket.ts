import { NextApiRequest } from "next";
import { io } from "socket.io-client";
import { NextApiResponseServerIO } from "../../source/types/next";

const raffleSocket = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const socket = res?.socket?.server?.io;
    const body = JSON.parse(req.body);
    const mods = body.mods;
    const emit = body.emit;

    if (emit === "add-button") {
      const newButton = body.button;

      mods.map((mod: string) => {
        socket?.to(mod.toLowerCase()).emit("res-add-button", newButton);
      });
    } else if (emit === "delete-button") {
      const newButton = body.button;

      mods.map((mod: string) => {
        socket?.to(mod.toLowerCase()).emit("res-delete-button", newButton);
      });
    } else if (emit === "sync-buttons-req") {
      const requester = body.requester;
      mods.map((mod: string) => {
        socket?.to(mod.toLowerCase()).emit("req-buttons", requester);
      });
    } else if (emit === "sync-buttons-res") {
      const requester = body.requester.toLowerCase();
      const buttons = body.buttons;
      socket?.to(requester).emit("res-buttons", buttons);
    } else if (emit === "selector-req") {
      const button = body.button;

      mods.map((mod: string) => {
        socket?.to(mod.toLowerCase()).emit("res-selected-button", button);
      });
    } else if (emit === "req-reset") {
      mods.map((mod: string) => {
        socket?.to(mod.toLowerCase()).emit("res-reset");
      });
    } else if (emit === "req-timer-selection") {
      const timer = body.body;

      mods.map((mod: string) => {
        socket?.to(mod.toLowerCase()).emit("res-timer-selected", timer);
      });
    } else if (emit === "req-shuffle") {
      const data = body.body;
      mods.map((mod: string) => {
        socket?.to(mod.toLowerCase()).emit("res-shuffle", data);
      });
    }

    res.end();
  }
};

export default raffleSocket;
