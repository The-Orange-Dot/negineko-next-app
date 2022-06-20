import React, { useState } from "react";
import styles from "../../styles/overlay.module.css";
import { addText, updateText } from "../../redux/actions/textOverlaySlice";
import { useDispatch, useSelector } from "react-redux";
import { SpeedDial, SpeedDialAction, Box, Paper } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { useSession } from "next-auth/react";

const OverlaySpeedDial = () => {
  const connected = useSelector((state: any) => state.socket.connected);
  const session = useSession();
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const addTextHandler = () => {
    const newText = JSON.stringify({
      id: Date.now().toString(),
      fontSize: 18,
      color: "#000000",
      fontWeight: "normal",
      input: "Text Input",
      position: [1000, 200],
    });

    dispatch(addText(newText));

    if (connected) {
      fetch("api/textOverlaySocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-add-text",
          streamer: session.data.name,
          modFor: session.data.modFor,
          text: newText,
        }),
      });
    }
  };

  const actions = [
    { icon: <TextFieldsIcon onClick={addTextHandler} />, name: "Add text" },
  ];

  return (
    <>
      <SpeedDial
        color="secondary"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        hidden={hidden}
        ariaLabel="SpeedDial"
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default OverlaySpeedDial;
