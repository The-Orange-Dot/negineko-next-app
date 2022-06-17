import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import styles from "../../styles/modControls.module.css";
import { setSelectedText } from "../../redux/actions/textOverlaySlice";
import FontWeight from "../Overlay/FontWeight";
import FontSizeSelector from "../Overlay/FontSizeSelector";
import { updateText, subtractText } from "../../redux/actions/textOverlaySlice";
import { CompactPicker } from "react-color";
import { TextDiractionalPad } from "../Overlay/TextDiractionalPad";

const TextControlPanel = () => {
  const dispatch = useDispatch();
  const texts = useSelector((state: any) => state.textOverlay.value);
  const selected = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelected = JSON.parse(selected);
  const [textInput, setTextInput] = useState(parsedSelected.input);
  const [fontSize, setFontSize] = useState(12);
  const [fontWeight, setFontWeight] = useState("normal");
  const [colorSelected, setColorSelected] = useState("#000000");

  useEffect(
    () => {
      setTextInput(parsedSelected.input);
      setColorSelected(parsedSelected.color);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected]
  );

  const parsedTexts = texts.map((text: string) => {
    const parsed = JSON.parse(text);

    return (
      <div key={parsed.id}>
        <Button
          variant="contained"
          onClick={() => dispatch(setSelectedText(parsed.id))}
          sx={{ m: 0.5, width: 240 }}
        >
          {parsed.input.length > 20
            ? `${parsed.input.slice(0, 18)}...`
            : parsed.input}
        </Button>
      </div>
    );
  });

  const updateFontHandler = () => {
    const updatedText = {
      id: parsedSelected.id,
      fontSize: fontSize,
      color: colorSelected,
      fontWeight: fontWeight,
      input: textInput,
      position: parsedSelected.position,
    };

    const stringifyText = JSON.stringify(updatedText);

    dispatch(updateText(stringifyText));
  };

  return (
    <div className={styles.textOverlayContainer}>
      <div className={styles.buttonContainer}>{parsedTexts}</div>
      <div className={styles.textInputContainer}>
        <Button
          variant="contained"
          onClick={updateFontHandler}
          sx={{ width: 80, height: 90, m: 1 }}
        >
          Submit
        </Button>
        <TextField
          sx={{ m: 0.5, width: 250 }}
          placeholder="Select a text to edit"
          size="small"
          multiline
          rows={3}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <div>
          <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
          <FontWeight fontWeight={fontWeight} setFontWeight={setFontWeight} />
        </div>
        <div>
          <CompactPicker onChange={setColorSelected} color={colorSelected} />
        </div>
        <div className={styles.directionalPadContainer}>
          <TextDiractionalPad />
        </div>
      </div>
    </div>
  );
};

export default TextControlPanel;
