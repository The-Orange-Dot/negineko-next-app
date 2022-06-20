import prisma from "../../lib/prisma";

import { NextApiRequest } from "next";
import { io } from "socket.io-client";
import { NextApiResponseServerIO } from "../../source/types/next";

const raffleSocket = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  if (req.method === "POST") {
    const socket = res?.socket?.server?.io;
    const body = JSON.parse(req.body);
    const streamer = body.streamer;

    const modsData = await prisma.mod.findMany({
      where: { streamer: streamer },
      select: { name: true },
    });

    const mods = modsData.map((mod: { name: string }) =>
      mod.name.toLowerCase()
    );

    if (body.modFor) {
      mods.push(body.modFor.toLowerCase());
    }

    const emit = body.emit;

    if (emit === "req-update-text") {
      const updatedText = body.updatedText;

      mods.map((mod: string) => {
        socket?.to(mod).emit("res-update-text", updatedText);
      });
      socket?.to(streamer.toLowerCase()).emit("res-update-text", updatedText);
    } else if (emit === "req-fetch-texts") {
      socket?.to(streamer.toLowerCase()).emit("res-fetch-texts");
    } else if (emit === "req-send-texts") {
      const texts = body.texts;
      console.log(texts);

      mods.map((mod: string) => {
        socket?.to(mod).emit("res-send-texts", texts);
      });
    } else if (emit === "req-add-text") {
      const text = body.text;
      mods.map((mod: string) => {
        socket?.to(mod).emit("res-add-text", text);
      });
    } else if (emit === "req-delete-text") {
      mods.map((mod: string) => {
        const selectedText = body.selectedText;
        socket?.to(mod).emit("res-delete-text", selectedText);
      });
    }
  }

  res.end();
};

export default raffleSocket;
