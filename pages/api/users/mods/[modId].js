import NextCors from "nextjs-cors";
import { server } from "../../../../config/index";

async function handler(req, res) {
  const corsreq = req.headers.key;
  const corsKey = process.env.CORS_KEY;

  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: function (origin, callback) {
      if (corsKey === corsreq) {
        callback(null, true);
      } else {
        res.status(401).json({ error: "YOU AREN'T ORANGE! UNAUTHORIZED!" });
      }
    },
  });

  if (req.method === "GET") {
    //Gets Access token from Twitch
    const token = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=viewing_activity_read+moderation%3Aread`,
      {
        method: "POST",
      }
    );

    const tokenParsed = await token.json();
    const username = req.query.modId;

    const user = await fetch(
      `https://api.twitch.tv/helix/users?login=${username}`,
      {
        headers: {
          Authorization: `Bearer ${tokenParsed.access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      }
    );

    const userInfo = await user.json();
    const userId = await userInfo.data[0].id;

    const userToken = await fetch(`${server}/api/users`, {
      method: "POST",
      headers: {
        key: "orange_is_orange",
      },
      body: JSON.stringify({ userId: userId }),
    });

    const ParsedUserToken = await userToken.json();
    // console.log(ParsedUserToken);

    const mod = await fetch(
      `https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${ParsedUserToken.access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      }
    );

    const modList = await mod.json();
    const parsedModList = modList.data;

    //Filters out all the bot names
    const bots = ["streamlab", "nightbot", "streamelements", "streamlabs"];
    const updatedList = await parsedModList.filter((mod) => {
      return !bots.includes(mod.user_name.toLowerCase());
    });

    res.status(200).json(updatedList);
  }
  res.end();
}

export default handler;
