import prisma from "../../../../lib/prisma";
import NextCors from "nextjs-cors";
import { server } from "../../../../config";
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

  if (req.method === "PATCH") {
    const mod = req.body.username;
    const streamer = req.query.streamersId;

    //Finds streamer and mod data
    const foundStreamer = await prisma.user.findFirst({
      where: {
        name: {
          mode: "insensitive",
          contains: streamer,
        },
      },
    });

    const foundMod = await prisma.user.findFirst({
      where: {
        name: {
          mode: "insensitive",
          contains: mod,
        },
      },
    });

    const modRecievedArray = foundStreamer.modRequestReceived.map((mod) =>
      mod.toLowerCase()
    );
    const modSentArray = foundMod.modRequestSent.map((streamer) =>
      streamer.toLowerCase()
    );

    if (!modRecievedArray.includes(mod.toLowerCase())) {
      //Adds mod to streamer's pending list
      await prisma.user.update({
        where: {
          name: foundStreamer.name,
        },
        data: {
          modRequestReceived: [...foundStreamer.modRequestReceived, mod],
        },
      });
    }

    //Adds mod to own sent and pending list
    if (!modSentArray.includes(streamer.toLowerCase())) {
      await prisma.user.update({
        where: {
          name: foundMod.name,
        },
        data: { modRequestSent: [...foundMod.modRequestSent, streamer] },
      });
    }

    res.status(201).end();
  } else if (req.method === "GET") {
    const username = req.query.streamersId;

    const token = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=viewing_activity_read`,
      {
        method: "POST",
      }
    );
    const tokenParsed = await token.json();

    const response = await fetch(
      `https://api.twitch.tv/helix/users?login=${username}`,
      {
        headers: {
          Authorization: `Bearer ${tokenParsed.access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      }
    );

    let user;
    const data = await response.json();
    const streamer = data.data[0];
    if (streamer?.display_name !== undefined) {
      user = {
        username: streamer.display_name,
        image: streamer.profile_image_url,
      };
    } else {
      user = {
        username: "Cannot find user",
        image: "/images/Orange.png",
      };
    }

    res.status(200).json(user);
  }

  res.end();
}

export default handler;
