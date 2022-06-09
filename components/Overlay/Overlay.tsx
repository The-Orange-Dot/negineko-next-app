import React, { useEffect, useState } from "react";
import styles from "../../styles/overlay.module.css";
import OverlayComponent from "./OverlayComponent";
import { addText, updateText } from "../../redux/actions/textOverlaySlice";
import { useDispatch, useSelector } from "react-redux";

const TextOverlay = () => {
  const textOverlay = useSelector((state: any) => state.textOverlay.value);
  const [texts, setTexts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const textsOverlay = textOverlay.map((data: string) => {
      const text = JSON.parse(data);
      return (
        <OverlayComponent
          key={text.id}
          id={text.id}
          fontSize={text.fontSize}
          color={text.color}
          fontWeight={text.fontWeight}
          textInput={text.input}
          position={text.position}
        />
      );
    });
    setTexts(textsOverlay);
  }, [textOverlay, dispatch]);

  const addTextHandler = () => {
    dispatch(
      addText(
        JSON.stringify({
          id: Date.now().toString(),
          fontSize: 18,
          color: "#00000",
          fontWeight: "normal",
          input: "Text Input",
          position: [0, 0],
        })
      )
    );
  };

  return (
    <div className={styles.overlayPageContainer}>
      {texts.length > 0 ? (
        <div className={styles.overlayPageContent}>{texts}</div>
      ) : (
        <div className={styles.noTextOverlayPageContent}>
          <p>Double click the screen to add text</p>
        </div>
      )}
      <button
        onClick={() => {
          addTextHandler();
        }}
        className={styles.addTextButton}
      >
        Add text
      </button>
    </div>
  );
};

export default TextOverlay;
