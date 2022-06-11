import React from "react";
import { setTextColor } from "../../redux/actions/giveawaySlice";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { Switch, ThemeProvider } from "@mui/material";
import { colorTheme } from "../MuiColorThemes";

const TextColor = () => {
  const session = useSession();
  const dispatch = useDispatch();

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
        streamer: session.data.name,
        modFor: session.data.modFor,
        textColor: textColor,
      }),
    });
  };

  return (
    <>
      <p>options</p>
      <span>
        <label htmlFor="white-text">White-Text</label>
        <ThemeProvider theme={colorTheme}>
          <Switch
            color="secondary"
            type="checkbox"
            name="white-text"
            id="white-text"
            onChange={(e) => {
              textColorHandler(e);
            }}
          />
        </ThemeProvider>
      </span>
    </>
  );
};

export default TextColor;
