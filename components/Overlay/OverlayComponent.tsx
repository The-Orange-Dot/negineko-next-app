import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "../../styles/overlay.module.css";
import {
  addText,
  savePosition,
  subtractText,
  updateText,
} from "../../redux/actions/textOverlaySlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

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
  const [overlayItem, setOverlayItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(textInput);
  const [style, setStyle] = useState({
    fontSize: fontSize,
    color: color,
    fontWeight: fontWeight,
    input: textInput,
  });

  useEffect(
    () => {
      setStyle({
        fontSize: fontSize,
        color: color,
        fontWeight: fontWeight,
        input: text,
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [fontSize, color, fontWeight, textInput]
  );

  useEffect(
    () => {
      const overlayTextItems = (
        <Draggable
          bounds="parent"
          positionOffset={{ x: "0%", y: "0%" }}
          defaultPosition={{ x: position[0], y: position[1] }}
          onStop={(e) => {
            positionHandler(e);
          }}
          handle="#handle"
        >
          {edit ? (
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className={styles.editTextContainer}
            >
              <input
                type="text"
                name="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder={textInput}
                className={styles.textInput}
                id="handle"
                autoComplete="off"
              />
              <span className={styles.editContainer}>
                <span>
                  <label htmlFor="font-size">Font size:</label>
                  <input
                    type="number"
                    name="font-size"
                    defaultValue={style.fontSize}
                    className={styles.fontSize}
                  />
                </span>
                <span>
                  <label htmlFor="color">Color:</label>
                  <input type="color" name="color" defaultValue={style.color} />
                </span>
                <span>
                  <label htmlFor="bold">Bold: </label>
                  <input type="checkbox" name="bold" />
                </span>
                <input type="submit" className={styles.button} />
                <button
                  className={styles.button}
                  onClick={() => {
                    deleteHandler();
                  }}
                >
                  Delete
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
              </span>
            </form>
          ) : (
            <p
              className={styles.textBox}
              id="handle"
              onDoubleClick={() => {
                setEdit(true);
              }}
              style={style}
            >
              {textInput}
            </p>
          )}
        </Draggable>
      );

      setOverlayItem(overlayTextItems);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [style, position, edit, text, fontSize]
  );

  const deleteHandler = () => {
    const updatedTextList = textOverlay.filter((text: string) => {
      const parsed = JSON.parse(text);

      if (id !== parsed.id) {
        return JSON.stringify(parsed);
      }
    });

    dispatch(subtractText(updatedTextList));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    let weight: string;
    if (e.target[3].checked) {
      weight = "bold";
    } else {
      weight = "normal";
    }

    const updatedText = textOverlay.map((data: string) => {
      const parsed = JSON.parse(data);

      if (id === parsed.id) {
        parsed.fontSize = parseInt(e.target[1].value);
        parsed.color = e.target[2].value;
        parsed.fontWeight = weight;
        parsed.input = text;
      }
      return JSON.stringify(parsed);
    });

    dispatch(updateText(updatedText));

    setEdit(false);
  };

  const positionHandler = (position: any) => {
    let x = position.x;
    let y = position.y;
    if (position.x >= 1500) {
      x = 1500;
    } else if (position.x < 0) {
      x = 0;
    } else {
      x = position.clientX - 25;
    }

    if (position.y < 85) {
      y = 5;
    } else if (position.clientY >= 700) {
      y = 850;
    } else {
      y = position.clientY - 95;
    }

    dispatch(
      savePosition({ position: [x, y], id: id, textOverlay: textOverlay })
    );
  };

  return overlayItem;
};

export default OverlayComponent;
