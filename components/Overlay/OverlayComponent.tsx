import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "../../styles/overlay.module.css";
import {
  savePosition,
  subtractText,
  updateText,
} from "../../redux/actions/textOverlaySlice";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedText } from "../../redux/actions/textOverlaySlice";

const OverlayComponent = ({
  id,
  fontSize,
  color,
  fontWeight,
  textInput,
  position,
}) => {
  const dispatch = useDispatch();
  const textOverlay = useSelector((state: any) => state.textOverlay.value);
  const [textHighlighted, setTextHighlighted] = useState("");
  const [overlayItem, setOverlayItem] = useState(null);
  const [style, setStyle] = useState({
    fontSize: fontSize,
    color: color?.hex,
    fontWeight: fontWeight,
    border: "",
  });

  useEffect(
    () => {
      let border: string;
      textHighlighted === id ? (border = "1px solid #dfdfdf") : (border = "");

      setStyle({
        fontSize: fontSize,
        color: color?.hex,
        fontWeight: fontWeight,
        border: border,
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [fontSize, color, fontWeight, textInput, textHighlighted]
  );

  useEffect(
    () => {
      const overlayTextItems = (
        <Draggable
          bounds="parent"
          position={{
            x: position[0],
            y: position[1],
          }}
          onStop={(e) => {
            positionHandler(e);
          }}
          handle="#handle"
        >
          <p
            className={styles.textBox}
            id="handle"
            onClick={() => {
              dispatch(setSelectedText(id));
            }}
            onMouseEnter={() => {
              setTextHighlighted(id);
            }}
            onMouseLeave={() => {
              setTextHighlighted("");
            }}
            style={style}
          >
            {textInput}
          </p>
        </Draggable>
      );

      setOverlayItem(overlayTextItems);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [style, position, fontSize]
  );

  const positionHandler = (position: any) => {
    let x = position.x;
    let y = position.y;
    if (position.x >= 1500) {
      x = 1500;
    } else if (position.x < 0) {
      x = 0;
    } else {
      x = position.x - 150;
    }

    if (position.y < 85) {
      y = 5;
    } else if (position.clientY >= 700) {
      y = 850;
    } else {
      y = position.y - 110;
    }

    dispatch(
      savePosition({ position: [x, y], id: id, textOverlay: textOverlay })
    );
  };

  return overlayItem;
};

export default OverlayComponent;
