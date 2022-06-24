import React, { useState, useRef } from "react";
import styles from "../../../styles/botReference.module.css";
import {
  Paper,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

const TwitchReferences = () => {
  const [openFolder, setOpenFolder] = useState("");

  //Folder and buttons user commands
  const userCommandsArray = [
    {
      title: "Timeout user",
      text: "/timeout [username][duration]",
      value: "/timeout ",
      description: "Temporarily bans a user from chat for a set duration",
    },
    {
      title: "Ban user",
      text: "/ban [username]",
      value: "/ban ",
      description: "Permanently ban a user from Chat",
    },
    {
      title: "Unban user",
      text: "/unban [username]",
      value: "/unban ",
      description: "Remove a timeout or a permanent ban on a user",
    },
    {
      title: "VIP user",
      text: "/vip [username]",
      value: "/vip ",
      description: "Grant VIP status to a user. They get a purty diamond",
    },
    {
      title: "Remove VIP from user",
      text: "/unvip [username] ",
      value: "/unvip ",
      description: "Revoke VIP status from a user. Take back the diamond",
    },
    {
      title: "Mod user",
      text: "/mod [username] ",
      value: "/mod ",
      description: "Captures a user to make them a moderator for this channel",
    },
    {
      title: "Unmod user",
      text: "/unmod [username] ",
      value: "/unmod ",
      description: "Removes moderator from channel and sets them free",
    },
  ];
  const userCommands = userCommandsArray.map((command) => (
    <CardActionArea key={command.text}>
      <Card className={styles.botCommandCard} variant="outlined">
        <Box
          className={styles.botCommands}
          onClick={() => {
            navigator.clipboard.writeText(command.value);
          }}
        >
          <Typography
            className={styles.command}
            sx={{ fontWeight: "bold", m: 0 }}
            variant="h6"
          >
            {command.title}
          </Typography>
          <Typography
            className={styles.command}
            variant="caption"
            sx={{ m: 0, color: "gray", lineHeight: 0.5, opacity: "70%" }}
          >
            {command.text}
          </Typography>
          <Typography className={styles.description} variant="subtitle2">
            {command.description}
          </Typography>
        </Box>
      </Card>
    </CardActionArea>
  ));

  //Folder and buttons chat commands
  const chatCommandsArray = [
    {
      title: "Emotes only",
      text: "/emoteonly",
      value: "/emoteonly",
      description: "Restricts chat to emotes only",
    },
    {
      title: "Turn off emotes only",
      text: "/emoteonlyoff",
      value: "/emoteonlyoff",
      description: "Removes emotes only mode",
    },
    {
      title: "Slow down chat",
      text: "/slow [duration]",
      value: "/slow ",
      description: "Limit how frequently users can send messages in Chat",
    },
    {
      title: "Turn off slow chat",
      text: "/slowoff",
      value: "/slowoff",
      description: "Turns off slow chat mode",
    },
    {
      title: "Followers only chat",
      text: "/followers [duration]",
      value: "/followers ",
      description: "Restrict Chat to followers based on their follow duration",
    },
    {
      title: "Turn off followers only chat",
      text: "/followersoff",
      value: "/followersoff",
      description: "Turns off followers only mode",
    },
    {
      title: "Subscribers only chat",
      text: "/subscribers",
      value: "/subscribers",
      description: "Restricts chat to subscribers only",
    },
    {
      title: "Turn off subscribers only chat",
      text: "/subscribersoff",
      value: "/subscribersoff",
      description: "Turns off subscribers only mode",
    },
    {
      title: "Unique chat only",
      text: "/uniquechat",
      value: "/uniquechat",
      description: "Prevent users from sending duplicate messages in Chat",
    },
    {
      title: "Turn off unique chat",
      text: "/uniquechatoff",
      value: "/uniquechatoff",
      description: "Prevent users from sending duplicate messages in Chat",
    },
  ];
  const chatCommands = chatCommandsArray.map((command) => (
    <CardActionArea key={command.text}>
      <Card className={styles.botCommandCard} variant="outlined">
        <Box
          className={styles.botCommands}
          onClick={() => {
            navigator.clipboard.writeText(command.value);
          }}
        >
          <Typography
            className={styles.command}
            sx={{ fontWeight: "bold", m: 0 }}
            variant="h6"
          >
            {command.title}
          </Typography>
          <Typography
            className={styles.command}
            variant="caption"
            sx={{ m: 0, color: "gray", lineHeight: 0.5, opacity: "70%" }}
          >
            {command.text}
          </Typography>
          <Typography className={styles.description} variant="subtitle2">
            {command.description}
          </Typography>
        </Box>
      </Card>
    </CardActionArea>
  ));

  //Folder and buttons for stream commands
  const streamCommandsArray = [
    {
      title: "Place stream marker",
      text: "/marker [description]",
      value: "/marker ",
      description:
        "Adds a stream marker on your stream's VOD to go back to later. [description] is optional",
    },
    {
      title: "Play commercial",
      text: "/commercial [duration]",
      value: "/commercial ",
      description:
        "Play commercial for 30/60/90/120 seconds (leave duration blank for 30 seconds)",
    },
    {
      title: "Raid another channel",
      text: "/raid [channel_name]",
      value: "/raid ",
      description: "Redirects your chat to another live channel",
    },
    {
      title: "Cancel raid",
      text: "/unraid",
      value: "/unraid",
      description:
        "Cancels the current raid or unraid a channel that you are raiding",
    },
    {
      title: "Host another channel",
      text: "/host [channel_name]",
      value: "/host ",
      description: "Host another streamer's channel on your channel",
    },
    {
      title: "Unhost channel",
      text: "/unhost",
      value: "/unhost",
      description: "Stop hosting the channel that you are currently hosting",
    },
  ];
  const streamCommands = streamCommandsArray.map((command) => (
    <CardActionArea key={command.text}>
      <Card className={styles.botCommandCard} variant="outlined">
        <Box
          className={styles.botCommands}
          onClick={() => {
            navigator.clipboard.writeText(command.value);
          }}
        >
          <Typography
            className={styles.command}
            sx={{ fontWeight: "bold", m: 0 }}
            variant="h6"
          >
            {command.title}
          </Typography>
          <Typography
            className={styles.command}
            variant="caption"
            sx={{ m: 0, color: "gray", lineHeight: 0.5, opacity: "70%" }}
          >
            {command.text}
          </Typography>
          <Typography className={styles.description} variant="subtitle2">
            {command.description}
          </Typography>
        </Box>
      </Card>
    </CardActionArea>
  ));

  return (
    <Paper className={styles.botCommandsContainer}>
      {/** COMMANDS FOR USERS */}
      <CardActionArea className={styles.cardContainer}>
        <Card
          className={styles.botCommandFolders}
          onClick={() => {
            if (openFolder === "users") {
              setOpenFolder("");
            } else {
              setOpenFolder("users");
            }
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            User Commands
          </Typography>
          <Typography variant="caption" sx={{ color: "gray", opacity: "90%" }}>
            Timeout, ban, VIP and other moderation commands for users
          </Typography>
        </Card>
      </CardActionArea>

      <Paper
        className={
          openFolder === "users" ? styles.testOpened : styles.testClosed
        }
      >
        {openFolder === "users" ? userCommands : null}
      </Paper>

      {/** COMMANDS FOR CHAT */}
      <CardActionArea className={styles.cardContainer}>
        <Card
          className={styles.botCommandFolders}
          onClick={() => {
            if (openFolder === "chat") {
              setOpenFolder("");
            } else {
              setOpenFolder("chat");
            }
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Chat Commands
          </Typography>
          <Typography variant="caption" sx={{ color: "gray", opacity: "90%" }}>
            Toggles subscribers/followers only chat, slow chat, etc.
          </Typography>
        </Card>
      </CardActionArea>

      <Paper
        className={
          openFolder === "chat" ? styles.testOpened : styles.testClosed
        }
      >
        {openFolder === "chat" ? chatCommands : null}
      </Paper>

      {/** COMMANDS FOR STREAM */}
      <CardActionArea className={styles.cardContainer}>
        <Card
          className={styles.botCommandFolders}
          onClick={() => {
            if (openFolder === "stream") {
              setOpenFolder("");
            } else {
              setOpenFolder("stream");
            }
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Stream Commands
          </Typography>
          <Typography variant="caption" sx={{ color: "gray", opacity: "90%" }}>
            Edit stream titles, raids, commercials, etc.
          </Typography>
        </Card>
      </CardActionArea>

      <Paper
        className={
          openFolder === "stream" ? styles.testOpened : styles.testClosed
        }
      >
        {openFolder === "stream" ? streamCommands : null}
      </Paper>
    </Paper>
  );
};

export default TwitchReferences;
