import React from "react";
import styles from "../../../styles/botReference.module.css";

const HomeReferencePage = () => {
  return (
    <div className={styles.homeInfoContainer}>
      <h3>
        Select the bot you would like to see the bot commands reference for
      </h3>
      <p>Tap the command to copy the command text and past it into the chat</p>
    </div>
  );
};

export default HomeReferencePage;
