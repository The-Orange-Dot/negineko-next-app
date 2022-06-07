import React, { useState } from "react";
import styles from "../../styles/overlay.module.css";
import Draggable from "react-draggable";

const TextOverlay = () => {
  const [position, setPosition] = useState([0, 0]);

  const overlayTextItems = (
    <Draggable
      bounds="parent"
      position={{ x: position[0], y: position[1] }}
      onStop={(e) => {
        positionHandler(e);
      }}
    >
      <p className={styles.test}>textOverlay</p>
    </Draggable>
  );

  const positionHandler = (position: any) => {
    const x = position.x - 20;
    const y = position.y - 95;
    setPosition([x, y]);
  };

  return (
    <div className={styles.overlayPageContainer}>
      <div className={styles.overlayPageContent}>{overlayTextItems}</div>
    </div>
  );
};

export default TextOverlay;
