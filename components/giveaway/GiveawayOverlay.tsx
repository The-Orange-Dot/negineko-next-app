import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { setPosition } from "../../redux/actions/giveawaySlice";

const GiveawayOverlay = ({ parentRef }) => {
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

  const positionHandler = (position: any, text: string) => {
    const parent = parentRef.current.getBoundingClientRect();
    const rect = position.target.getBoundingClientRect();
    let x: number;
    let y: number;
    if (text === "text") {
      x = rect.left - parent.left - 258;
      y = rect.top - parent.top - 44;
    } else {
      x = rect.left - parent.left - 1;
      y = rect.top - parent.top - 1;
    }
    dispatch(setPosition([x, y]));
  };

  return (
    <Draggable
      bounds={{ left: 0, top: 0, bottom: 680, right: 1200 }}
      position={position ? { x: position[0], y: position[1] } : { x: 0, y: 0 }}
      onStop={(e) => {
        positionHandler(e, "");
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
          <h1
            style={textStyles}
            onMouseUp={(e) => {
              positionHandler(e, "text");
            }}
          >
            {selectedButton.title}
          </h1>
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
