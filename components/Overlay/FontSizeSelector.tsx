import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const FontSizeSelector = ({ setFontSize, fontSize }) => {
  const selectedText = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelectedText = JSON.parse(selectedText);

  const handleChange = (event: any) => {
    setFontSize(event.target.value);
  };

  useEffect(
    () => {
      if (selectedText) {
        setFontSize(parsedSelectedText.fontSize);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedText]
  );

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="font-size-label">Font Size</InputLabel>
        <Select
          labelId="font-size-label"
          value={`${fontSize}`}
          label="Font Size"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={32}>32</MenuItem>
          <MenuItem value={48}>48</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FontSizeSelector;
