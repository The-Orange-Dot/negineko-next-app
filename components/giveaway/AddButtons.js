import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addButton } from "../../redux/actions/giveawaySlice";

const AddButtons = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const [buttonNameInput, setButtonNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [userInput, setUserInput] = useState("");

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
        mods: [...mods, ...modFor],
        button: newButton,
      }),
    });

    // await socket?.emit("req-add-button", newButton, [...mods, ...modFor]);
  };

  const darkMode = useSelector((state) => state.darkMode.value);
  const socket = useSelector((state) => state.socket.value.socket);
  const mods = session.data.mods;
  const modFor = session.data.modFor;

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          className={darkMode ? styles.darkTextBox : styles.textBox}
          type="text"
          name="name"
          placeholder="Button Name"
          onChange={(e) => {
            setButtonNameInput(e.target.value);
          }}
          maxLength="10"
          required
        />
        <input
          className={darkMode ? styles.darkTextBox : styles.textBox}
          type="text"
          name="description"
          placeholder='Title (ex: "Gaming mouse Giveaway")'
          onChange={(e) => {
            setDescriptionInput(e.target.value);
          }}
          maxLength="100"
          required
        />
        <textarea
          className={darkMode ? styles.darkTextBox : styles.textBox}
          type="text"
          name="users"
          placeholder='Users - Seperate users with a space (ex: "mocchan nacchan debuneko draculabot")'
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          rows="8"
          cols="50"
          required
          style={{ resize: "none" }}
        />
      </div>
      <div className={styles.submitButton}>
        <button
          onClick={() => {
            addNewItem();
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddButtons;
