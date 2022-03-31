import React from "react";

const Options = ({ setTextColor, textColor, screenColor, setScreenColor }) => {
  return (
    <>
      <p>options</p>
      <span>
        <label htmlFor="white-text">White-Text</label>
        <input
          type="checkbox"
          name="white-text"
          id="white-text"
          onChange={() => {
            textColor === "white"
              ? setTextColor("black")
              : setTextColor("white");
          }}
        />
      </span>
      <span>
        <label htmlFor="key-color">Key-color</label>
        <input
          type="checkbox"
          name="key-color"
          id="key-color"
          onChange={() => {
            screenColor === "white"
              ? setScreenColor("#00b140")
              : setScreenColor("white");
          }}
        />
      </span>
      {/* <label htmlFor="mocchan">Mocchan</label>
      <input type="checkbox" name="mocchan" id="mocchan" />
      <label htmlFor="nacchan">Nacchan</label>
      <input type="checkbox" name="nacchan" id="nacchan" /> */}
    </>
  );
};

export default Options;
