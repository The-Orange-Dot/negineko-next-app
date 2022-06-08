import React, { useState } from "react";
import styles from "../../styles/overlay.module.css";
import OverlayComponent from "./OverlayComponent";

const TextOverlay = () => {
  const [texts, setTexts] = useState([{ src: <OverlayComponent />, id: 1 }]);

  const textsOverlay = texts.map((text) => {
    return <div key={text.id}>{text.src}</div>;
  });

  return (
    <div className={styles.overlayPageContainer}>
      <div className={styles.overlayPageContent}>{textsOverlay}</div>
    </div>
  );
};

export default TextOverlay;
