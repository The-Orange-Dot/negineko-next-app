import React from "react";
import styles from "../../styles/giveaway.module.css";

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
  const addNewItem = (users, description) => {
    setArrays({ ...arrays, ...users });
    setDescriptor({ ...descriptor, ...description });
  };
  return (
    <>
      <div className={styles.inputContainer}>
        <input
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
          type="text"
          name="users"
          placeholder='Users - Seperate users with a space (ex: "mocchan nacchan debuneko draculabot")'
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          rows="8"
          cols="50"
          required
        />
      </div>
      <div className={styles.submitButton}>
        <button
          onClick={() => {
            Object.keys(arrays).length < 9
              ? addNewItem(
                  { [`${itemNameInput}`]: userInput.split(" ") },
                  { [`${itemNameInput}`]: descriptionInput }
                )
              : null;
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddButtons;
