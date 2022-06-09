import React from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";

const GiveawayOverlay = () => {
  const textColor = useSelector((state: any) => state.giveaway.textColor);
  const selectedButton = useSelector((state: any) => state.giveaway.selected);
  const winner = useSelector((state: any) => state.giveaway.winner);

  const selectedWinner = useSelector(
    (state: any) => state.giveaway.winnerSelected
  );

  // TEXT-COLOR-OPTIONS
  const textStyles = {
    color: textColor,
    transition: "0.3s",
  };
  return (
    <Draggable bounds="parent">
      <div className={styles.giveawayStyles}>
        <span className={styles.screenDisplay}>
          <h1 style={textStyles}>{selectedButton.title}</h1>
          <div>
            {selectedWinner ? <h1 style={textStyles}>WINNER!</h1> : null}
            <h1 style={textStyles}>{winner}</h1>
          </div>
        </span>
      </div>
    </Draggable>
  );
};

export default GiveawayOverlay;
