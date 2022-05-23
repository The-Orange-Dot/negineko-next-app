import React from "react";
import styles from "../styles/switch.module.css";

const Switch = ({ isOn, handleToggle, onColor }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
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
