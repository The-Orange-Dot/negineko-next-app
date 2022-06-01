import prisma from "../../../../lib/prisma";
import NextCors from "nextjs-cors";
import { server } from "../../../../config";
import { stream } from "xlsx";
import { Req, Res } from "../../../../source/requests";

async function handler(req: Req, res: Res) {
  const corsreq = req.headers.key;
  const corsKey = process.env.CORS_KEY;

  await NextCors(req, res, {
    methods: ["GET", "PATCH", "POST"],
    origin: function (origin, callback) {
      if (corsKey === corsreq) {
        callback(null, true);
      } else {
        res.status(401).json({ error: "YOU AREN'T ORANGE! UNAUTHORIZED!" });
      }
    },
  });

  if (req.method === "PATCH") {
    const mods = req.body.modRequests;
    const streamerName = req.body.username;

    const streamerData = await prisma.user.update({
      where: { name: streamerName },
      data: { modsPending: mods },
    });

    res.status(201).json(streamerData.modsPending);
  }

  res.end();
}

export default handler;
