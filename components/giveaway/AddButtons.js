import React, { useEffect } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const AddButtons = ({
  setItemNameInput,
  setDescriptionInput,
  setUserInput,
  itemNameInput,
  userInput,
  descriptionInput,
  arrays,
  descriptor,
  setArrays,
  setDescriptor,
}) => {
  const session = useSession();
  const addNewItem = async (users, description) => {
    await setArrays({ ...arrays, ...users });
    await setDescriptor({ ...descriptor, ...description });
  };
  const darkMode = useSelector((state) => state.darkMode.value);
  const socket = useSelector((state) => state.socket.value.socket);
  const mods = session.data.mods;
  const modFor = session.data.modFor;

  useEffect(() => {
    socket?.on("sent-buttons", async (users, descriptions) => {
      await setArrays({ ...arrays, ...users });
      await setDescriptor({ ...descriptor, ...descriptions });
    });
  }, [socket, descriptor, arrays, setArrays, setDescriptor]);

  const submitHandler = async () => {
    await addNewItem(
      { [`${itemNameInput}`]: userInput.split(" ") },
      { [`${itemNameInput}`]: descriptionInput }
    );

    await socket?.emit("add-button", arrays, descriptor, [...mods, ...modFor]);
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          className={darkMode ? styles.darkTextBox : styles.textBox}
          type="text"
          name="name"
          placeholder="Button Name"
          onChange={(e) => {
            setItemNameInput(e.target.value);
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
            Object.keys(arrays).length < 9 ? submitHandler() : null;
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddButtons;
