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

  const { username } = req.query;
  const user = await prisma.user.findFirst({
    where: { name: username },
  });

  if (req.method === "GET") {
    res.status(200).json(user);
  } else if (req.method === "PATCH") {
    let updatedLocationLikes;

    if (!user.location_likes.includes(req.body.locationName)) {
      updatedLocationLikes = [...user.location_likes, req.body.locationName];
    } else {
      updatedLocationLikes = user.location_likes.filter(
        (location) => location !== req.body.locationName
      );
    }

    const updatedUser = await prisma.user.update({
      where: { name: user.name },
      data: {
        location_likes: updatedLocationLikes,
      },
    });
    res.status(201).json(updatedUser);
  }
}

export default handler;
