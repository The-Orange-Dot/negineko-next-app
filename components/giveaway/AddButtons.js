import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addButton } from "../../redux/actions/giveawaySlice";
import { TextField, Button } from "@mui/material";
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
  const connected = useSelector((state) => state.socket.connected);

  const addNewItem = async () => {
    const newButton = {
      buttonName: buttonNameInput,
      title: descriptionInput,
      users: userInput.split(" "),
    };

    dispatch(addButton(newButton));
    if (connected) {
      fetch("/api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "add-button",
          streamer: session.data.name,
          modFor: session.data.modFor,
          button: newButton,
        }),
      });
    }

    setButtonNameInput("");
    setDescriptionInput("");
    setUserInput("");
    // await socket?.emit("req-add-button", newButton, [...mods, modFor]);
  };

  let submitValidation;
  if (
    buttonNameInput.trim().length > 1 &&
    descriptionInput.trim().length > 1 &&
    userInput.length > 1
  ) {
    submitValidation = (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          addNewItem();
        }}
        style={{ marginRight: 5 }}
      >
        <AddIcon />
      </Button>
    );
  } else {
    submitValidation = (
      <Button
        color="primary"
        variant="contained"
        disabled
        style={{ marginRight: 5 }}
      >
        <AddIcon />
      </Button>
    );
  }

  return (
    <span className={styles.formInputContainer}>
      <div className={styles.submitButton}>
        {submitValidation}
        <div className={styles.inputContainer}>
          <TextField
            autoComplete="off"
            hiddenLabel
            variant="filled"
            size="small"
            className={darkMode ? styles.darkTextBox : styles.textBox}
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
            autoComplete="off"
            hiddenLabel
            variant="filled"
            size="small"
            className={darkMode ? styles.darkTextBox : styles.textBox}
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
            autoComplete="false"
            hiddenLabel
            variant="filled"
            size="small"
            multiline
            rows={4}
            className={darkMode ? styles.darkTextBox : styles.textBox}
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
      </div>
    </span>
  );
};

export default AddButtons;
