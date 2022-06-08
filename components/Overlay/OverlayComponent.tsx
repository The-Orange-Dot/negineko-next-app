import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "../../styles/overlay.module.css";
import { addButton, deleteButton } from "../../redux/actions/giveawaySlice";

const OverlayComponent = ({ id, dispatch, texts }) => {
  const [overlayItem, setOverlayItem] = useState(null);
  const [position, setPosition] = useState([0, 0]);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("Input Text");
  const [bold, setBold] = useState("normal");
  const [checked, setChecked] = useState(false);
  const [style, setStyle] = useState({
    fontSize: 18,
    color: "#00000",
    fontWeight: "normal",
  });

  useEffect(() => {
    const overlayTextItems = (
      <Draggable
        bounds={{ left: 0, top: 5, bottom: 850, right: 1500 }}
        positionOffset={{ x: "0%", y: "50%" }}
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
                <input
                  type="color"
                  name="color"
                  defaultValue={style.color}
                  onChange={(e) => console.log(e.target.value)}
                />
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

  const deleteHandler = () => {
    const updatedTexts = texts.filter((text: any) => {
      return text.id !== id;
    });
    setText(updatedTexts);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(e.target[3].checked);

    let weight: string;
    if (e.target[3].checked) {
      weight = "bold";
    } else {
      weight = "normal";
    }

    setStyle({
      fontSize: parseInt(e.target[1].value),
      color: e.target[2].value,
      fontWeight: weight,
    });

    setEdit(false);
  };

  const positionHandler = (position: any) => {
    console.log(position.clientX);

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
    } else if (position.clientY >= 900) {
      y = 850;
    } else {
      y = position.clientY - 95;
    }
    setPosition([x, y]);
  };
  return overlayItem;
};

export default OverlayComponent;
