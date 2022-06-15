import React, { useState } from "react";
import styles from "../../styles/overlay.module.css";
import { addText, updateText } from "../../redux/actions/textOverlaySlice";
import { useDispatch, useSelector } from "react-redux";
import { SpeedDial, SpeedDialAction, Box } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { styled } from "@mui/material/styles";

const OverlayControls = () => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const addTextHandler = () => {
    dispatch(
      addText(
        JSON.stringify({
          id: Date.now().toString(),
          fontSize: 18,
          color: "#00000",
          fontWeight: "normal",
          input: "Text Input",
          position: [0, 0],
        })
      )
    );
  };
  {
    /* <button
        onClick={() => {
          addTextHandler();
        }}
        className={styles.addTextButton}
      >
        Add text
      </button> */
  }
  const actions = [
    { icon: <TextFieldsIcon onClick={addTextHandler} />, name: "Add text" },
  ];

  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    bottom: 16,
    right: 16,
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      left: theme.spacing(2),
    },
  }));

  return (
    <SpeedDial
      color="secondary"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      hidden={hidden}
      ariaLabel="SpeedDial"
      icon={<SpeedDialIcon />}
      direction="left"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default OverlayControls;
