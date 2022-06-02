import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";
import { LocationType } from "../../../source/types/next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const corsreq = req.headers.key;
  const corsKey = "orange_is_orange";

  await NextCors(req, res, {
    methods: ["GET"],
    origin: function (origin, callback) {
      if (corsKey === corsreq) {
        callback(null, true);
      } else {
        res.status(401).json({ error: "YOU AREN'T ORANGE! UNAUTHORIZED!" });
      }
    },
  });

  if (req.method === "GET") {
    const locations: LocationType[] = await prisma.location.findMany();
    res.status(200).json(locations);
  }
}

export default handler;
