import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";
import { server } from "../../../config";
import { stream } from "xlsx";

async function handler(req, res) {
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

  if (req.method === "GET") {
    let username = req.query.userId;
    let data = [];
    const user = await prisma.user.findFirst({
      where: { name: { contains: username, mode: "insensitive" } },
    });

    if (user.streamer) {
      data = await prisma.mod.findMany({
        where: {
          streamer: username,
        },
      });
    } else {
      data = [
        await prisma.user.findFirst({
          where: { name: { contains: user.modFor, mode: "insensitive" } },
        }),
      ];
    }

    const parsedMods = data.map((mod) => {
      return {
        name: mod.name,
        image: mod.image,
      };
    });

    res.status(200).json(parsedMods);
  } else if (req.method === "PATCH") {
    let updatedLocationLikes = user.location_likes;

    if (!user.location_likes.includes(req.body.locationName)) {
      updatedLocationLikes.push(req.body.locationName);
    } else {
      updatedLocationLikes = user.location_likes.filter(
        (location) => location !== req.body.locationName
      );
    }

    const updatedUser = await prisma.user.update({
      where: { name: req.body.username },
      data: {
        location_likes: updatedLocationLikes,
      },
    });
    res.status(201).json(updatedUser);
  }
}

export default handler;
