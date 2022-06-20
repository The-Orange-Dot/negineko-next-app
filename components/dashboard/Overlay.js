import React, { useState, useRef } from "react";
import styles from "../../styles/overlay.module.css";
import OverlayTexts from "../Overlay/OverlayTexts";
import GiveawayOverlay from "../giveaway/GiveawayOverlay";
import ColorKey from "../ColorKey";

const Overlay = ({ children }) => {
  const parentRef = useRef(null);

  return (
    <div className={styles.overlayPageContainer} ref={parentRef}>
      <div className={styles.overlayPageContent} id="boundries">
        <OverlayTexts parentRef={parentRef} />
        <GiveawayOverlay parentRef={parentRef} />
        {children}
      </div>
      <ColorKey />
    </div>
  );
};

export default Overlay;
