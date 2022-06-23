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

  const selectorHeight = 40;
  const paddingTop = 10;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: selectorHeight * 4 + paddingTop,
        width: 250,
      },
    },
  };

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
          MenuProps={MenuProps}
        >
          <MenuItem value={"American Typewriter"}>American Typewriter</MenuItem>
          <MenuItem value={"Arial"}>Arial</MenuItem>
          <MenuItem value={"Avenir"}>Avenir</MenuItem>
          <MenuItem value={"Baskerville"}>Baskerville</MenuItem>
          <MenuItem value={"Courier"}>Courier</MenuItem>
          <MenuItem value={"Futura"}>Futura</MenuItem>
          <MenuItem value={"Georgia"}>Georgia</MenuItem>
          <MenuItem value={"Helvetica"}>Helvetica</MenuItem>
          <MenuItem value={"Menlo"}>Menlo</MenuItem>
          <MenuItem value={"Noteworthy"}>Noteworthy</MenuItem>
          <MenuItem value={"Optima"}>Optima</MenuItem>
          <MenuItem value={"Papyrus"}>Papyrus</MenuItem>
          <MenuItem value={"Party LET"}>Party LET</MenuItem>
          <MenuItem value={"Sigmar One"}>Sigmar One</MenuItem>
          <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
          <MenuItem value={"Verdana"}>Verdana</MenuItem>
          <MenuItem value={"Zapfino"}>Zapfino</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FontFamilySelector;
