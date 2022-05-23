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

  let users = await prisma.user.findMany();

  if (req.method === "GET") {
    return res.status(200).json(users);
  } else if (req.method === "PATCH") {
    let user = await prisma.user.update({
      where: { name: req.body.user },
      data: {
        streamer: req.body.streamer,
        mods: req.body.mods,
        mod: req.body.mod,
        modFor: req.body.modFor,
      },
    });
    console.log(user);
    res.status(201).json(req.body);
  }
}

export default handler;
