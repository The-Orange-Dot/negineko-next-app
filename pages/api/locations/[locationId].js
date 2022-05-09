import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";

async function handler(req, res) {
  const corsreq = req.headers.key;
  const corsKey = process.env.CORS_KEY;

  await NextCors(req, res, {
    methods: ["GET", "PATCH"],
    origin: function (origin, callback) {
      if (corsKey === corsreq) {
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
