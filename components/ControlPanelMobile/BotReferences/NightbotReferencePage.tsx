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

const NightbotReferencePage = () => {
  const [openFolder, setOpenFolder] = useState("");

  //Folder and buttons user commands
  const streamCommandsArray = [
    {
      title: "Change stream title",
      text: "!title [new_title]",
      value: "!title ",
      description: "Change the stream title",
    },
    {
      title: "Create new poll",
      text: "!poll new title | option1 | option2",
      value: "!poll new ",
      description: `Create a new poll for chat. Vertical bars "|" required. 2 options required, up to a max of 30`,
    },
    {
      title: "Show poll results",
      text: "!poll results",
      value: "!poll results ",
      description: `Shows the most recent poll results`,
    },
    {
      title: "Check weather in Tokyo",
      text: "$(weather tokyo)",
      value: "$(weather tokyo)",
      description: `Checks and displays the weather in Tokyo in chat`,
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

  //Folder and buttons user commands
  const botCommandsArray = [
    {
      title: "Add custom command",
      text: "!command add ![command_name] [text]",
      value: "!command add !",
      description:
        "Adds a new custom command to nightbot with the value of [text]",
    },
    {
      title: "Edit custom command",
      text: "!command edit ![command_name] [new_text]",
      value: "!command edit !",
      description:
        "Edits a custom command to replace the value with [new_text]",
    },
    {
      title: "Delete custom command",
      text: "!command edit ![command_name]",
      value: "!command delete !",
      description: "Deletes a custom command",
    },
  ];
  const botCommands = botCommandsArray.map((command) => (
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

  //Folder and buttons user commands
  const spamProtectionArray = [
    {
      title: "Permit user to post link",
      text: "!permit [username]",
      value: "!permit ",
      description: "Permits a user to post links with a duration of 60 seconds",
    },
  ];
  const spamProtection = spamProtectionArray.map((command) => (
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

  //Folder and buttons user commands
  const customCommandsArray = [
    {
      title: "DJ Kalid's key to success",
      text: "And another one",
      value: "DJ Khalid: $(djkhaled)",
      description: "Just paste it in chat",
    },
  ];
  const customCommands = customCommandsArray.map((command) => (
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
      {/* * COMMANDS FOR USERS */}
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
            Change the stream titles and other stream info
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

      {/* * COMMANDS FOR SPAM */}
      <CardActionArea className={styles.cardContainer}>
        <Card
          className={styles.botCommandFolders}
          onClick={() => {
            if (openFolder === "spam") {
              setOpenFolder("");
            } else {
              setOpenFolder("spam");
            }
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Spam Protection Commands
          </Typography>
          <Typography variant="caption" sx={{ color: "gray", opacity: "90%" }}>
            Allow and block links and spam
          </Typography>
        </Card>
      </CardActionArea>

      <Paper
        className={
          openFolder === "spam" ? styles.testOpened : styles.testClosed
        }
      >
        {openFolder === "spam" ? spamProtection : null}
      </Paper>

      {/* * COMMANDS FOR BOT */}
      <CardActionArea className={styles.cardContainer}>
        <Card
          className={styles.botCommandFolders}
          onClick={() => {
            if (openFolder === "bot") {
              setOpenFolder("");
            } else {
              setOpenFolder("bot");
            }
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Bot Commands
          </Typography>
          <Typography variant="caption" sx={{ color: "gray", opacity: "90%" }}>
            Add, edit, or delete custom commands for Nightbot
          </Typography>
        </Card>
      </CardActionArea>

      <Paper
        className={openFolder === "bot" ? styles.testOpened : styles.testClosed}
      >
        {openFolder === "bot" ? (
          <>
            {botCommands}{" "}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 1,
                backgroundColor: "#f5f5f5",
              }}
            >
              {/** Advanced features for adding commands */}

              <Typography variant="h6">Advance Usage </Typography>
              <Typography variant="caption">
                You can also add optional user-levels and cooldowns on custom
                commands
              </Typography>
              <Box>
                <Typography variant="caption">
                  <strong>
                    -ul=[owner/moderator/regular/subscriber/everyone]
                  </strong>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption">
                  <strong>-cd=[number_of_seconds]</strong>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              ></Box>
              <Box
                sx={{
                  border: "1px solid gray",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontSize: ".8rem", backgroundColor: "#dfdfdf" }}
                >
                  ex. !commands add !test <strong>-ul=everyone -cd=10</strong>{" "}
                  PogChamp
                </Typography>
                <Typography variant="caption">
                  This creates a new &quot;!test&quot; command that says
                  &quot;PogChamp&quot; that everyone can use with a cooldown of
                  10 seconds
                </Typography>
              </Box>
            </Box>
          </>
        ) : null}
      </Paper>

      {/* * COMMANDS FOR CUSTOM */}
      <CardActionArea className={styles.cardContainer}>
        <Card
          className={styles.botCommandFolders}
          onClick={() => {
            if (openFolder === "custom") {
              setOpenFolder("");
            } else {
              setOpenFolder("custom");
            }
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Misc commands
          </Typography>
          <Typography variant="caption" sx={{ color: "gray", opacity: "90%" }}>
            Uhhh....random stuff?
          </Typography>
        </Card>
      </CardActionArea>

      <Paper
        className={
          openFolder === "custom" ? styles.testOpened : styles.testClosed
        }
      >
        {openFolder === "custom" ? customCommands : null}
      </Paper>
    </Paper>
  );
};

export default NightbotReferencePage;
