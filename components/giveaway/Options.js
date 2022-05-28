import React from "react";
import { setScreenColor } from "../../redux/actions/giveawaySlice";
import { useDispatch } from "react-redux";

const Options = ({ mods, setTextColor, textColor, screenColor }) => {
  const dispatch = useDispatch();
  const screenColorHandler = () => {
    let color;
    if (screenColor !== "none") {
      dispatch(setScreenColor("none"));
      color = "none";
    } else {
      dispatch(setScreenColor("#00b140"));
      color = "#00b140";
    }

    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "req-screen-color",
        mods: mods,
        color: color,
      }),
    });
  };

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
            screenColorHandler();
          }}
        />
      </span>
    </>
  );
};

export default Options;
