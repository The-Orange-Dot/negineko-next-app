import NextCors from "nextjs-cors";

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

  if (req.method === "POST") {
    //Gets Access token from Twitch
    const token = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=viewing_activity_read+moderation%3Aread`,
      {
        method: "POST",
      }
    );

    const tokenParsed = await token.json();
    const username = JSON.parse(req.body).username;

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
    const userId = userInfo.data[0];

    console.log(userId);

    const channel = await fetch(
      `https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${userId}&user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenParsed.access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      }
    );

    const channelInfo = await channel.json();
    console.log(channelInfo);

    // res.status(200).json(data);
    res.end();
  }
}

export default handler;
