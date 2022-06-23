import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "../../styles/overlay.module.css";
import { savePosition } from "../../redux/actions/textOverlaySlice";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedText } from "../../redux/actions/textOverlaySlice";

const OverlayComponent = ({
  id,
  fontSize,
  color,
  fontWeight,
  textInput,
  position,
  parentRef,
  fontFamily,
  text,
}) => {
  const dispatch = useDispatch();
  const [textHighlighted, setTextHighlighted] = useState("");
  const [overlayItem, setOverlayItem] = useState(null);
  const [style, setStyle] = useState({
    fontSize: fontSize,
    color: color?.hex,
    fontWeight: fontWeight,
    border: "",
    fontFamily: fontFamily,
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
        fontFamily: fontFamily,
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [fontSize, color, fontWeight, textInput, textHighlighted, fontFamily]
  );

  useEffect(
    () => {
      const overlayTextItems = (
        <Draggable
          bounds={{ left: 0, top: 0, bottom: 680, right: 1200 }}
          onStop={(e) => {
            positionHandler(e, id);
          }}
          position={
            position ? { x: position[0], y: position[1] } : { x: 600, y: 300 }
          }
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

  const positionHandler = async (position: any, id: string) => {
    const updatedText = text;
    const parent = parentRef.current.getBoundingClientRect();
    const rect = position.target.getBoundingClientRect();

    let x: number;
    let y: number;

    if (x > 1200) {
      x = 1200;
    } else if (x < 0) {
      x = 0;
    } else {
      x = rect.left - parent.left;
    }

    if (y > 680) {
      y = 680;
    } else if (y < 0) {
      y = 0;
    } else {
      y = rect.top - parent.top - fontSize;
    }

    console.log(parent);
    console.log(rect);
    console.log(x, y);

    updatedText.position = [x, y];
    const updatedStringified = JSON.stringify(updatedText);
    dispatch(savePosition(updatedStringified));
  };

  return overlayItem;
};

export default OverlayComponent;
