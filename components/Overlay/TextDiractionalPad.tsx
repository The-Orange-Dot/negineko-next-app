import React from "react";
import { Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "../../styles/overlay.module.css";

export const TextDiractionalPad = () => {
  return (
    <>
      <div>
        <Button variant="contained" fullWidth sx={{ m: 0.2 }}>
          <ArrowDropUpIcon />
        </Button>
      </div>
      <div>
        <Button variant="contained" fullWidth sx={{ m: 0.2 }}>
          <ArrowLeftIcon />
        </Button>
        <Button variant="contained" fullWidth sx={{ m: 0.2 }}>
          <ArrowRightIcon />
        </Button>
      </div>
      <div>
        <Button variant="contained" fullWidth sx={{ m: 0.2 }}>
          <ArrowDropDownIcon />
        </Button>
      </div>
    </>
  );
};
