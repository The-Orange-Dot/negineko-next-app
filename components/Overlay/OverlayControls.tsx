import React from "react";
import styles from "../../styles/overlay.module.css";
import { addText, updateText } from "../../redux/actions/textOverlaySlice";
import { useDispatch, useSelector } from "react-redux";

const OverlayControls = () => {
  const dispatch = useDispatch();
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
    <button
      onClick={() => {
        addTextHandler();
      }}
      className={styles.addTextButton}
    >
      Add text
    </button>
  );
};

export default OverlayControls;
