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
  const addNewItem = async () => {
    const users = { [`${itemNameInput}`]: userInput.split(" ") };
    const description = { [`${itemNameInput}`]: descriptionInput };

    // await setArrays({ ...arrays, ...users });
    // await setDescriptor({ ...descriptor, ...description });

    await socket?.emit(
      "add-button",
      { ...arrays, ...users },
      { ...descriptor, ...description },
      [...mods, ...modFor]
    );

    localStorage.setItem("arrays", JSON.stringify({ ...arrays, ...users }));
    localStorage.setItem(
      "descriptions",
      JSON.stringify({ ...descriptor, ...description })
    );
  };

  const darkMode = useSelector((state) => state.darkMode.value);
  const socket = useSelector((state) => state.socket.value.socket);
  const mods = session.data.mods;
  const modFor = session.data.modFor;

  useEffect(() => {
    socket?.on("sent-buttons", async (users, descriptions) => {
      await setArrays({ ...arrays, ...users });
      await setDescriptor({ ...descriptor, ...descriptions });

      localStorage.setItem("arrays", JSON.stringify({ ...arrays, ...users }));
      localStorage.setItem(
        "descriptions",
        JSON.stringify({ ...descriptor, ...descriptions })
      );
    });
  }, [socket, descriptor, arrays, setArrays, setDescriptor]);

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
            Object.keys(arrays).length < 9 ? addNewItem() : null;
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddButtons;
