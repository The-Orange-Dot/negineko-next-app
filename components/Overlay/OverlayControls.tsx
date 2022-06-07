import React from "react";
import styles from "../../styles/overlay.module.css";

const OverlayControls = () => {
  return (
    <div className={styles.overlayControlsContainer}>
      <button className={styles.addTextButton}>Add Text</button>
    </div>
  );
};

export default OverlayControls;
