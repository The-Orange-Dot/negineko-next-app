import prisma from "../../../../lib/prisma";
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

  if (req.method === "PATCH") {
    const mod = req.body.username;
    const streamer = req.body.streamer;

    //Finds streamer and mod data
    const foundStreamer = await prisma.user.findFirst({
      where: {
        name: {
          mode: "insensitive",
          contains: streamer.username,
        },
      },
    });

    if (!foundStreamer) {
      res.status(406).json({
        error: "The streamer has not registered with this site yet!",
      });
    }

    const foundMod = await prisma.user.findFirst({
      where: {
        name: {
          mode: "insensitive",
          contains: mod,
        },
      },
    });

    console.log(foundMod);

    const modRecievedArray = foundStreamer.modRequestReceived.map((mod) =>
      mod.toLowerCase()
    );
    const modSentArray = foundMod.modRequestSent.map((streamer) =>
      streamer.toLowerCase()
    );

    if (!modRecievedArray.includes(mod.toLowerCase())) {
      if (foundStreamer.modsPending.includes(mod)) {
        console.log("Add mod directly");

        await prisma.user.update({
          where: {
            name: mod,
          },
          data: {
            mod: true,
            modFor: foundStreamer.name,
          },
        });

        await prisma.mod.create({
          data: {
            streamer: foundStreamer.name,
            name: mod,
            pending: false,
            image: foundMod.image,
          },
        });

        //Filter name out of pending mods
        const updatedPendingMods = foundStreamer.modsPending.filter(
          (modName) => {
            return modName !== mod;
          }
        );

        await prisma.user.update({
          where: { name: foundStreamer.name },
          data: {
            modsPending: updatedPendingMods,
          },
        });

        res.status(201).json({
          message: `${foundStreamer.name} has been waiting for you! You're now registered as a mod.`,
        });
      } else {
        console.log("Mod isnt here");

        await prisma.user.update({
          where: {
            name: mod,
          },
          data: {
            modRequestSent: foundStreamer.name,
          },
        });

        await prisma.user.update({
          where: { name: foundStreamer.name },
          data: {
            modRequestReceived: [...foundStreamer.modRequestReceived, mod],
          },
        });

        res.status(201).json({
          message: `Your mod request has been sent to ${foundStreamer.name}`,
        });
      }
    }
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
