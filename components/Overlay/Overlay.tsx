import React, { useState } from "react";
import styles from "../../styles/overlay.module.css";
import OverlayComponent from "./OverlayComponent";

const TextOverlay = () => {
  const [texts, setTexts] = useState([]);
  const textsOverlay = texts.map((text) => {
    return <div key={text.id}>{text.src}</div>;
  });

  return (
    <div className={styles.overlayPageContainer}>
      {texts.length > 0 ? (
        <div className={styles.overlayPageContent}>{textsOverlay}</div>
      ) : (
        <div className={styles.noTextOverlayPageContent}>
          <p>Double click the screen to add text</p>
        </div>
      )}
      <button
        onClick={() =>
          setTexts([
            ...texts,
            {
              src: (
                <OverlayComponent
                  id={Date.now()}
                  setTexts={setTexts}
                  texts={texts}
                />
              ),
              id: Date.now(),
            },
          ])
        }
        className={styles.addTextButton}
      >
        Add text
      </button>
    </div>
  );
};

export default TextOverlay;
