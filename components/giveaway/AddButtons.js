import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addButton } from "../../redux/actions/giveawaySlice";
import { TextField, Button, ThemeProvider } from "@mui/material";
import { colorTheme } from "../MuiColorThemes";
import AddIcon from "@mui/icons-material/Add";

const AddButtons = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const [buttonNameInput, setButtonNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const mods = useSelector((state) => state.mods.mods);
  const modFor = session.data.modFor;
  const darkMode = useSelector((state) => state.darkMode.value);
  const socket = useSelector((state) => state.socket.value.socket);

  const addNewItem = async () => {
    const newButton = {
      buttonName: buttonNameInput,
      title: descriptionInput,
      users: userInput.split(" "),
    };

    dispatch(addButton(newButton));

    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "add-button",
        mods: [...mods],
        button: newButton,
      }),
    });

    setButtonNameInput("");
    setDescriptionInput("");
    setUserInput("");
    // await socket?.emit("req-add-button", newButton, [...mods, modFor]);
  };

  return (
    <span className={styles.formInputContainer}>
      <div className={styles.submitButton}>
        <ThemeProvider theme={colorTheme}>
          <Button
            color={colorTheme.primary}
            variant="contained"
            onClick={() => {
              addNewItem();
            }}
            style={{ marginRight: 5 }}
          >
            <AddIcon />
          </Button>
          <div className={styles.inputContainer}>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              className={darkMode ? styles.darkTextBox : styles.textBox}
              type="text"
              name="name"
              placeholder="Button Name"
              onChange={(e) => {
                setButtonNameInput(e.target.value);
              }}
              value={buttonNameInput}
              maxLength="10"
              required
            />
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              className={darkMode ? styles.darkTextBox : styles.textBox}
              type="text"
              name="description"
              placeholder='Title (ex: "Gaming mouse Giveaway")'
              onChange={(e) => {
                setDescriptionInput(e.target.value);
              }}
              maxLength="100"
              value={descriptionInput}
              required
            />
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              multiline
              rows={4}
              className={darkMode ? styles.darkTextBox : styles.textBox}
              type="text"
              name="users"
              placeholder='Users - Seperate users with a space (ex: "mocchan nacchan debuneko draculabot")'
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              cols="50"
              required
              style={{ resize: "none" }}
              value={userInput}
            />
          </div>
        </ThemeProvider>
      </div>
    </span>
  );
};

export default AddButtons;
