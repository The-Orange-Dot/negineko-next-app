import React from "react";
import {
  setScreenColor,
  setTextColor,
} from "../../redux/actions/giveawaySlice";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const Options = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const mods = [...session.data.mods, ...session.data.modFor];

  //Sets text color from black to white
  const textColorHandler = (e) => {
    let textColor;
    if (e.target.checked) {
      textColor = "white";
      dispatch(setTextColor("white"));
    } else {
      textColor = "black";
      dispatch(setTextColor("black"));
    }

    fetch("/api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "req-text-color",
        mods: mods,
        textColor: textColor,
      }),
    });
  };

  //Adds key color of #00b140
  const screenColorHandler = (e) => {
    let color;
    if (e.target.checked) {
      dispatch(setScreenColor("#00b140"));
      color = "#00b140";
    } else {
      dispatch(setScreenColor("none"));
      color = "none";
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
          onChange={(e) => {
            textColorHandler(e);
          }}
        />
      </span>
      <span>
        <label htmlFor="key-color">Key-color</label>
        <input
          type="checkbox"
          name="key-color"
          id="key-color"
          onChange={(e) => {
            screenColorHandler(e);
          }}
        />
      </span>
    </>
  );
};

export default Options;
