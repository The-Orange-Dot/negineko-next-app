import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const FontWeight = ({ fontWeight, setFontWeight }) => {
  const selectedText = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelectedText = JSON.parse(selectedText);

  const handleChange = (event: any) => {
    setFontWeight(event.target.value);
  };

  useEffect(
    () => {
      if (selectedText) {
        setFontWeight(parsedSelectedText.fontWeight);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedText]
  );

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="font-weight-label">Font Weight</InputLabel>
        <Select
          labelId="font-weight-label"
          value={fontWeight}
          label="Font Weight"
          onChange={handleChange}
        >
          <MenuItem value={"lighter"}>Lighter</MenuItem>
          <MenuItem value={"light"}>Light</MenuItem>
          <MenuItem value={"normal"}>Normal</MenuItem>
          <MenuItem value={"bold"}>Bold</MenuItem>
          <MenuItem value={"bolder"}>Bolder</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FontWeight;
