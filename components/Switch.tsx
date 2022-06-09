import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/switch.module.css";
import { useDispatch, useSelector } from "react-redux";
import { darkModeOff, darkModeOn } from "../redux/actions/darkModeSlice";
import { RootState } from "../redux/store";

const Switch = ({ isOn, onColor }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const [toggle, setToggle] = useState(darkMode);

  useEffect(
    () => {
      if (toggle === true) {
        dispatch(darkModeOn());
      } else if (toggle === false) {
        dispatch(darkModeOff());
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggle]
  );

  return (
    <>
      <input
        checked={isOn}
        onChange={() => setToggle(!toggle)}
        className={styles.reactSwitchCheckbox}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className={styles.reactSwitchLabel}
        htmlFor={`react-switch-new`}
      >
        <span className={styles.reactSwitchButton} />
      </label>
    </>
  );
};

export default Switch;
