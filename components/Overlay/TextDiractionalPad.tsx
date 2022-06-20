import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "../../styles/overlay.module.css";
import { useSelector, useDispatch } from "react-redux";
import { savePosition } from "../../redux/actions/textOverlaySlice";

export const TextDiractionalPad = () => {
  const dispatch = useDispatch();
  const selectedText = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelected = selectedText ? JSON.parse(selectedText) : "";
  const [positionMovement, setPositionMovement] = useState(10);

  const positionHandler = (direction: string) => {
    let updatedSelected = parsedSelected;
    let position = parsedSelected.position;

    if (direction === "up") {
      position[1] += positionMovement;
    } else if (direction === "down") {
      position[1] -= positionMovement;
    } else if (direction === "right") {
      position[0] += positionMovement;
    } else if (direction === "left") {
      position[0] -= positionMovement;
    }

    updatedSelected.position = position;
    const stringified = JSON.stringify(updatedSelected);
    console.log(stringified);
    dispatch(savePosition({ textOverlay: [stringified] }));
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          positionHandler("left");
        }}
        className={styles.left}
        disableElevation
        disabled
      >
        <ArrowLeftIcon />
      </Button>

      <div className={styles.upDown}>
        <Button
          disabled
          variant="contained"
          fullWidth
          sx={{ height: "49%" }}
          className={styles.up}
          disableElevation
          onClick={() => {
            positionHandler("up");
          }}
        >
          <ArrowDropUpIcon />
        </Button>
        <Button
          disabled
          variant="contained"
          fullWidth
          sx={{ height: "49%" }}
          className={styles.down}
          disableElevation
          onClick={() => {
            positionHandler("down");
          }}
        >
          <ArrowDropDownIcon />
        </Button>
      </div>

      <Button
        disabled
        variant="contained"
        onClick={() => {
          positionHandler("right");
        }}
        className={styles.right}
        disableElevation
      >
        <ArrowRightIcon />
      </Button>
    </>
  );
};
