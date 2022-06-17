import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "../../styles/overlay.module.css";

export const TextDiractionalPad = () => {
  return (
    <>
      <Button variant="contained" className={styles.left} disableElevation>
        <ArrowLeftIcon />
      </Button>

      <div className={styles.upDown}>
        <Button
          variant="contained"
          fullWidth
          sx={{ height: "49%" }}
          className={styles.up}
          disableElevation
        >
          <ArrowDropUpIcon />
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ height: "49%" }}
          className={styles.down}
          disableElevation
        >
          <ArrowDropDownIcon />
        </Button>
      </div>

      <Button variant="contained" className={styles.right} disableElevation>
        <ArrowRightIcon />
      </Button>
    </>
  );
};
