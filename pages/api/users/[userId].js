import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";
import { server } from "../../../config";
import { stream } from "xlsx";
import { channel } from "diagnostics_channel";

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
    let streamer = "";
    const user = await prisma.user.findFirst({
      where: { name: { contains: username, mode: "insensitive" } },
    });

    if (user.streamer) {
      data = await prisma.mod.findMany({
        where: {
          streamer: username,
        },
      });

      streamer = data[0] ? data[0]?.streamer : "";
    } else {
      data = [
        await prisma.user.findFirst({
          where: { name: { contains: user.modFor, mode: "insensitive" } },
        }),
      ];

      streamer = data[0] ? data[0]?.name : "";
    }

    const parsedMods = data.map((mod) => {
      return {
        name: mod.name,
        image: mod.image,
      };
    });

    res.status(200).json(parsedMods);
  } else if (req.method === "PATCH") {
    const data = await JSON.parse(req.body);
    const username = await req.query.userId;

    const user = await prisma.user.findFirst({
      where: { name: username },
    });

    let updatedLikesList;
    if (data.event === "add") {
      updatedLikesList = [...user.location_likes, data.id];
    } else {
      updatedLikesList = user.location_likes.filter((locationId) => {
        return locationId !== data.id;
      });
    }

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: { location_likes: updatedLikesList },
    });

    res.status(201).json(updatedUser);
  } else if (req.method === "POST") {
    const streamer = req.query.userId;

    const token = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=viewing_activity_read+moderation%3Aread`,
      {
        method: "POST",
      }
    );
    const tokenParsed = await token.json();

    //Fetches Negi and Orange's data from Twitch
    const streamerData = await fetch(
      `https://api.twitch.tv/helix/users?login=${streamer}`,
      {
        headers: {
          Authorization: `Bearer ${tokenParsed.access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      }
    );
    const streamerParsed = await streamerData.json();

    const followersData = await fetch(
      `https://api.twitch.tv/helix/users/follows?to_id=${streamerParsed.data[0].id}&first=1`,
      {
        headers: {
          Authorization: `Bearer ${tokenParsed.access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      }
    );

    const streamsData = await fetch(
      `https://api.twitch.tv/helix/videos?user_id=${streamerParsed.data[0].id}&sort=time&type=archive&first=5`,
      {
        headers: {
          Authorization: `Bearer ${tokenParsed.access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      }
    );

    const channelData = await fetch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${streamerParsed.data[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${tokenParsed.access_token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      }
    );

    const followersParsed = await followersData.json();
    const channelParsed = await channelData.json();
    const streamsParsed = await streamsData.json();

    const streamsHistory = await streamsParsed.data.map((streamData) => {
      const thumbnail = streamData.thumbnail_url;

      const widthReplaced = thumbnail.replace("%{width}", "250");
      const heightReplaced = widthReplaced.replace("%{height}", "141");

      return {
        title: streamData.title,
        date: streamData.created_at,
        duration: streamData.duration,
        url: streamData.url,
        thumbnail: heightReplaced,
        viewCount: streamData.view_count,
        id: streamData.stream_id,
      };
    });

    const streamerInfo = {
      name: streamerParsed.data[0].display_name,
      created: streamerParsed.data[0].created_at,
      image: streamerParsed.data[0].profile_image_url,
      broadcasterType: streamerParsed.data[0].broadcaster_type,
      viewCount: streamerParsed.data[0].view_count,
      followers: followersParsed.total,
      language: channelParsed.data[0].broadcaster_language,
      lastStreamed: channelParsed.data[0].game_name,
      streamHistory: streamsHistory,
    };

    res.status(200).json(streamerInfo);
  }
}

export default handler;
