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

const StreamlabsReferencePage = () => {
  const [openFolder, setOpenFolder] = useState("");

  //Folder and buttons user commands
  const userCommandsArray = [
    {
      title: "Timeout user",
      text: "/timeout [username][duration]",
      value: "/timeout ",
      description: "Temporarily bans a user from chat for a set duration",
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

  return (
    <Paper className={styles.botCommandsContainer}>
      {/** COMMANDS FOR USERS */}
      {/* <CardActionArea className={styles.cardContainer}>
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
      </Paper> */}
      <div>StreamLabs commands to be added</div>
    </Paper>
  );
};

export default StreamlabsReferencePage;
