import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/switch.module.css";
import { useDispatch, useSelector } from "react-redux";
import { darkModeOff, darkModeOn } from "../redux/actions/darkModeSlice";

const Switch = ({ isOn, handleToggle, onColor }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.value);
  const [toggle, setToggle] = useState(darkMode);

  useEffect(() => {
    if (toggle === true) {
      dispatch(darkModeOn());
    } else if (toggle === false) {
      dispatch(darkModeOff());
    }
  }, [toggle]);

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
