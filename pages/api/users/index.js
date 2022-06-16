import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";

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

  if (req.method === "POST") {
    const id = JSON.parse(req.body).userId;
    const account = await prisma.account.findFirst({
      where: { providerAccountId: id },
    });
    return res.status(200).json(account);
  } else if (req.method === "PATCH") {
    const mods = req.body.pendingMods;

    // console.log(mods);
    const streamer = await prisma.user.findFirst({
      where: { name: req.body.username },
    });

    await Promise.all(
      mods.map(async (mod) => {
        await prisma.mod.create({
          data: {
            userId: streamer.id,
            username: mod,
          },
        });
      })
    );

    // let user = await prisma.user.update({
    //   where: { name: req.body.user },
    //   data: {
    //     streamer: req.body.streamer,
    //     mod: req.body.mod,
    //     pendingModFor: req.body.pendingModFor,
    //   },
    // });
    // console.log(user);
    // res.status(201).json(modsList);
    res.end();
  }
}

export default handler;
