import React from "react";
import { setScreenColor } from "../../redux/actions/giveawaySlice";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, ThemeProvider } from "@mui/material";
import { colorTheme } from "../MuiColorThemes";

const ColorKey = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.socket.connected);

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
    if (connected) {
      fetch("/api/raffleSocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-screen-color",
          streamer: session.data.name,
          modFor: session.data.modFor,
          color: color,
        }),
      });
    }
  };

  return (
    <span>
      <label htmlFor="key-color">Key-color</label>
      <ThemeProvider theme={colorTheme}>
        <Switch
          color="secondary"
          type="checkbox"
          name="key-color"
          id="key-color"
          onChange={(e) => {
            screenColorHandler(e);
          }}
        />
      </ThemeProvider>
    </span>
  );
};

export default ColorKey;
