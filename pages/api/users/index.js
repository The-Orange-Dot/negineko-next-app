import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";
import { server } from "../../../config";

async function handler(req, res) {
  const whitelist = req.headers.host;

  await NextCors(req, res, {
    methods: ["GET", "HEAD"],
    origin: function (origin, callback) {
      if (server.includes(whitelist)) {
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
