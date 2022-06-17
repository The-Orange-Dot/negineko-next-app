import React, { useState } from "react";
import styles from "../../styles/overlay.module.css";
import OverlayTexts from "../Overlay/OverlayTexts";
import GiveawayOverlay from "../giveaway/GiveawayOverlay";
import ColorKey from "../ColorKey";

const Overlay = ({ children }) => {
  return (
    <div className={styles.overlayPageContainer}>
      <div className={styles.overlayPageContent} id="boundries">
        <OverlayTexts />
        <GiveawayOverlay />
        {children}
      </div>
      <ColorKey />
    </div>
  );
};

export default Overlay;
