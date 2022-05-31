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

  console.log(req.query);
  const { username } = req.query;
  console.log(username);
}

export default handler;
