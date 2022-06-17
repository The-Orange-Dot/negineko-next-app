import React from "react";
import styles from "../styles/giveaway.module.css";
import { useSelector, useDispatch } from "react-redux";

const ColorKey = () => {
  const dispatch = useDispatch();
  const screenColor = useSelector((state: any) => state.giveaway.screenColor);

  // SCREEN-AREA-OPTIONS
  const screenStyles = {
    backgroundColor: screenColor === "none" ? "rgba(0,0,0,0)" : screenColor,
  };

  return <div className={styles.colorKey} style={{ ...screenStyles }} />;
};

export default ColorKey;
