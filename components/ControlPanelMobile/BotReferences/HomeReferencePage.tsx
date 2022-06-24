import React from "react";
import styles from "../../../styles/botReference.module.css";

const HomeReferencePage = () => {
  return (
    <div className={styles.botCommandsContainer}>
      <h3>Select the bot you would like to see the commands for</h3>
      <p>
        Tap the command to copy the command&apos;s text and paste it into the
        chat
      </p>
    </div>
  );
};

export default HomeReferencePage;
