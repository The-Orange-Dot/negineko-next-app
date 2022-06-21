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
}) => {
  const dispatch = useDispatch();
  const selectedText = useSelector((state: any) => state.textOverlay.selected);
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
          bounds={{ left: 0, top: 0, bottom: 680, right: 1200 }}
          onStop={(e) => {
            positionHandler(e);
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

  const positionHandler = (position: any) => {
    let updateText = JSON.parse(selectedText);
    const parent = parentRef.current.getBoundingClientRect();
    const rect = position.target.getBoundingClientRect();

    let x: number = rect.left - parent.left;
    let y: number = rect.top - parent.top - fontSize;

    updateText.position = [x, y];
    const updatedStringified = JSON.stringify(updateText);
    dispatch(savePosition(updatedStringified));
  };

  return overlayItem;
};

export default OverlayComponent;
