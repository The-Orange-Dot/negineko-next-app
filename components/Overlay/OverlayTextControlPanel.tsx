import React, { useState, useEffect } from "react";
import { Paper, TextField, Button } from "@mui/material";
import styles from "../../styles/overlay.module.css";
import FontSizeSelector from "./FontSizeSelector";
import { useSelector, useDispatch } from "react-redux";
import FontWeight from "./FontWeight";
import { CompactPicker } from "react-color";
import { TextDiractionalPad } from "./TextDiractionalPad";
import { updateText, subtractText } from "../../redux/actions/textOverlaySlice";
import { useSession } from "next-auth/react";

const OverlayTextControlPanel = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const allTexts = useSelector((state: any) => state.textOverlay.value);
  const selectedText = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelectedText = selectedText ? JSON.parse(selectedText) : "";
  const [textInput, setTextInput] = useState("");
  const [colorSelected, setColorSelected] = useState("#000000");
  const [fontSize, setFontSize] = useState(12);
  const [fontWeight, setFontWeight] = useState("normal");

  useEffect(
    () => {
      if (selectedText) {
        setTextInput(parsedSelectedText.input);
        setColorSelected(parsedSelectedText.color);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedText]
  );

  const updateFontHandler = () => {
    const updatedText = {
      id: parsedSelectedText.id,
      fontSize: fontSize,
      color: colorSelected,
      fontWeight: fontWeight,
      input: textInput,
      position: parsedSelectedText.position,
    };

    const stringifyText = JSON.stringify(updatedText);

    dispatch(updateText(stringifyText));

    fetch("/api/textOverlaySocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "req-update-text",
        streamer: session.data.mod ? session.data.modFor : session.data.name,
        updatedText: stringifyText,
      }),
    });
  };

  const deleteHandler = () => {
    const filteredTexts = allTexts.filter((text: string) => {
      const parsed = JSON.parse(text);
      if (parsedSelectedText.id !== parsed.id) {
        return text;
      }
    });

    dispatch(subtractText(filteredTexts));
  };

  return (
    <Paper className={styles.textControlsContainer}>
      <div className={styles.buttonsContainer}>
        <Button
          onClick={updateFontHandler}
          className={styles.textControlsSubmitButton}
          variant="contained"
        >
          Submit
        </Button>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </div>
      <div className={styles.textControlsTextField}>
        <TextField
          sx={{ m: 1 }}
          size="small"
          autoComplete="off"
          fullWidth
          multiline
          rows={4}
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
        />
      </div>
      <div className={styles.textControlFontSize}>
        <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
        <FontWeight fontWeight={fontWeight} setFontWeight={setFontWeight} />
      </div>
      <div>
        <CompactPicker onChange={setColorSelected} color={colorSelected} />
      </div>
      <div className={styles.directionalPadContainer}>
        <TextDiractionalPad />
      </div>
    </Paper>
  );
};

export default OverlayTextControlPanel;
