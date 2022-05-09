import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";
import { server } from "../../../config";

async function handler(req, res) {
  const whitelist = req.headers.host;

  await NextCors(req, res, {
    methods: ["GET", "PATCH", "HEAD"],
    origin: function (origin, callback) {
      if (server.includes(whitelist)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });

  const { locationId } = req.query;

  if (req.method === "GET") {
    const location = await prisma.location.findUnique({
      where: { id: parseInt(locationId) },
    });
    res.status(200).json(location);
  } else if (req.method === "PATCH") {
    const location = await prisma.location.update({
      where: { id: parseInt(locationId) },
      data: { likes: req.body.updatedLiked },
    });
    res.status(201).json(location);
  }
}

export default handler;
