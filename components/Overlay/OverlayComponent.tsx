import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "../../styles/overlay.module.css";

const OverlayComponent = () => {
  const [overlayItem, setOverlayItem] = useState(null);
  const [position, setPosition] = useState([0, 0]);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("Input Text");
  const [style, setStyle] = useState({
    fontSize: 18,
    color: "#00000",
    // fontWeight: "normal",
  });

  useEffect(() => {
    const overlayTextItems = (
      <Draggable
        bounds={{ left: 0, top: 5, bottom: 850, right: 1500 }}
        defaultPosition={{ x: 200, y: 200 }}
        position={{ x: position[0], y: position[1] }}
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
              placeholder={text}
              className={styles.textInput}
              id="handle"
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
                <input
                  type="color"
                  name="color"
                  defaultValue={style.color}
                  onChange={(e) => console.log(e.target.value)}
                />
              </span>
              <input type="submit" />
            </span>
          </form>
        ) : (
          <p
            className={styles.test}
            id="handle"
            onDoubleClick={() => {
              setEdit(true);
            }}
            style={style}
          >
            {text}
          </p>
        )}
      </Draggable>
    );

    setOverlayItem(overlayTextItems);
  }, [style, position, edit, text]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setStyle({
      fontSize: parseInt(e.target[1].value),
      color: e.target[2].value,
    });

    setEdit(false);
  };

  const positionHandler = (position: any) => {
    let x = 0;
    let y = 0;
    if (position.x >= 1500) {
      x = 1500;
    } else if (position.x < 0) {
      x = 0;
    } else {
      x = position.x - 25;
    }

    if (position.y < 85) {
      y = 5;
    } else if (position.y >= 900) {
      y = 850;
    } else {
      y = position.y - 95;
    }
    console.log(position);
    setPosition([x, y]);
  };
  return overlayItem;
};

export default OverlayComponent;
