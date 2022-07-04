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
        res.status(401).json({ error: "YOU AREN'T ORANGE! UNAUTHORIZED!" });
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
    const location = await prisma.location.findFirst({
      where: { id: parseInt(locationId) },
    });

    let updatedLikes = location.likes;
    if (req.body === "liked") {
      updatedLikes++;
    } else {
      updatedLikes--;
    }

    const updatedLocation = await prisma.location.update({
      where: { id: parseInt(locationId) },
      data: { likes: updatedLikes },
    });
    res.status(201).json(updatedLocation);
  }
}

export default handler;
