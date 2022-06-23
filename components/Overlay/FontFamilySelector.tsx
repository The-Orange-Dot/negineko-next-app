import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const FontFamilySelector = ({ fontFamily, setFontFamily }) => {
  const selectedText = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelectedText = selectedText ? JSON.parse(selectedText) : "";

  const handleChange = (event: any) => {
    setFontFamily(event.target.value);
  };

  useEffect(
    () => {
      if (selectedText) {
        setFontFamily(parsedSelectedText.fontFamily);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedText]
  );

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="font-family-label">Font Family</InputLabel>
        <Select
          labelId="font-family-label"
          value={fontFamily}
          label="Font Family"
          onChange={handleChange}
        >
          <MenuItem value={"arial"}>Arial</MenuItem>
          <MenuItem value={"helvetica"}>Helvetica</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FontFamilySelector;
