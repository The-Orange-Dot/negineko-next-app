import React, { useEffect, useState } from "react";
import styles from "../../styles/overlay.module.css";
import OverlayComponent from "./OverlayComponent";
import { useDispatch, useSelector } from "react-redux";
import OverlayControls from "./OverlayControls";

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

  return (
    <>
      {texts.length > 0 ? (
        texts
      ) : (
        <div className={styles.noTextOverlayPageContent}>
          <p>Click on &rdquo;Add text&rdquo; below to start</p>
        </div>
      )}
    </>
  );
};

export default TextOverlay;
