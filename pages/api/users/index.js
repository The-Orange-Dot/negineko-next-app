import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";

async function handler(req, res) {
  const corsKey = process.env.CORS_KEY;

  await NextCors(req, res, {
    methods: ["GET"],
    origin: function (origin, callback) {
      if (corsKey === corsreq) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });

  const users = await prisma.user.findMany();
  if (req.method === "GET") {
    res.status(200).json(users);
  }
}

export default handler;
