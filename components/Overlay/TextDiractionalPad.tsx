import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "../../styles/overlay.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  savePosition,
  setSelectedText,
} from "../../redux/actions/textOverlaySlice";
import { useSession } from "next-auth/react";

export const TextDiractionalPad = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const selectedText = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelected = selectedText ? JSON.parse(selectedText) : "";
  const [positionMovement, setPositionMovement] = useState(10);
  const connected = useSelector((state: any) => state.socket.connected);
  let streamer: any;
  if (session.data.mod) {
    streamer = session.data.modFor;
  } else {
    streamer = session.data.name;
  }

  const positionHandler = (direction: string) => {
    let updatedSelected = parsedSelected;
    let position = parsedSelected.position;

    if (direction === "up") {
      if (position[1] <= 0) {
        position[1] = 0;
      } else {
        position[1] -= positionMovement;
      }
    } else if (direction === "down") {
      if (position[1] >= 675) {
        position[1] = 675;
      } else {
        position[1] += positionMovement;
      }
    } else if (direction === "right") {
      if (position[0] >= 1200) {
        position[0] = 1200;
      } else {
        position[0] += positionMovement;
      }
    } else if (direction === "left") {
      if (position[0] <= 0) {
        position[0] = 0;
      } else {
        position[0] -= positionMovement;
      }
    }

    updatedSelected.position = position;
    const stringified = JSON.stringify(updatedSelected);
    dispatch(savePosition(stringified));
    dispatch(setSelectedText(updatedSelected.id));

    if (connected) {
      fetch("/api/textOverlaySocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-update-text-position",
          streamer: streamer,
          updatedText: stringified,
        }),
      });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        // disabled={parsedSelected.position[0] <= 0 ? true : false}
        onClick={() => {
          positionHandler("left");
        }}
        className={styles.left}
        disableElevation
      >
        <ArrowLeftIcon />
      </Button>

      <div className={styles.upDown}>
        <Button
          variant="contained"
          fullWidth
          sx={{ height: "49%" }}
          className={styles.up}
          disableElevation
          onClick={() => {
            positionHandler("up");
          }}
          // disabled={parsedSelected.position[1] <= 0 ? true : false}
        >
          <ArrowDropUpIcon />
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ height: "49%" }}
          className={styles.down}
          disableElevation
          onClick={() => {
            positionHandler("down");
          }}
          // disabled={parsedSelected.position[1] >= 675 ? true : false}
        >
          <ArrowDropDownIcon />
        </Button>
      </div>

      <Button
        variant="contained"
        onClick={() => {
          positionHandler("right");
        }}
        className={styles.right}
        disableElevation
        // disabled={parsedSelected.position[0] >= 1200 ? true : false}
      >
        <ArrowRightIcon />
      </Button>
    </>
  );
};
