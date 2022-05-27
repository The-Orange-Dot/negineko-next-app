import { NextApiRequest } from "next";
import { io } from "socket.io-client";
import { NextApiResponseServerIO } from "../../source/types/next";

const raffleSocket = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const io = res?.socket?.server?.io;
    const body = JSON.parse(req.body);
    const mods = body.mods;

    if (body.emit === "add-button") {
      const newButton = body.button;

      mods.map((mod: string) => {
        io.to(mod.toLowerCase()).emit("res-add-button", newButton);
      });
    } else if (body.emit === "delete-button") {
      const newButton = body.button;

      mods.map((mod: string) => {
        io.to(mod.toLowerCase()).emit("res-delete-button", newButton);
      });
    }

    res.end();
  }
};

export default raffleSocket;
