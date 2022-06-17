import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { setPosition } from "../../redux/actions/giveawaySlice";

const GiveawayOverlay = () => {
  const dispatch = useDispatch();
  const textColor = useSelector((state: any) => state.giveaway.textColor);
  const selectedButton = useSelector((state: any) => state.giveaway.selected);
  const winner = useSelector((state: any) => state.giveaway.winner);
  const position = useSelector((state: any) => state.giveaway.position);
  const [highlighted, setHighlighted] = useState(false);
  const [border, setBorder] = useState("");

  const selectedWinner = useSelector(
    (state: any) => state.giveaway.winnerSelected
  );

  useEffect(() => {
    let border: string;
    highlighted ? (border = "1px solid #dfdfdf") : (border = "");

    setBorder(border);
  }, [highlighted]);

  // TEXT-COLOR-OPTIONS
  const textStyles = {
    transition: ".3s",
    color: textColor,
  };

  const positionHandler = (position: any) => {
    let x = position.x;
    let y = position.y;
    if (position.x >= 1500) {
      x = 1500;
    } else if (position.x < 0) {
      x = 0;
    } else {
      x = position.clientX - 250;
    }

    if (position.y < 85) {
      y = 5;
    } else if (position.clientY >= 700) {
      y = 850;
    } else {
      y = position.clientY - 95;
    }

    dispatch(setPosition([x, y]));
  };

  return (
    <Draggable
      bounds="parent"
      positionOffset={{ x: "0%", y: "0%" }}
      defaultPosition={
        position ? { x: position[0], y: position[1] } : { x: 0, y: 0 }
      }
      onStop={(e) => {
        positionHandler(e);
      }}
    >
      <div
        className={styles.giveawayStyles}
        style={{ border: border, borderRadius: "1rem" }}
        onMouseEnter={() => {
          setHighlighted(true);
        }}
        onMouseLeave={() => {
          setHighlighted(false);
        }}
      >
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
