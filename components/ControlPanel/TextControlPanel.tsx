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
import { useSession } from "next-auth/react";
import FontFamilySelector from "../Overlay/FontFamilySelector";

const TextControlPanel = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const connected = useSelector((state: any) => state.socket.connected);
  const texts = useSelector((state: any) => state.textOverlay.value);
  const selected = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelected = JSON.parse(selected);
  const [textInput, setTextInput] = useState(parsedSelected.input);
  const [fontSize, setFontSize] = useState(12);
  const [fontWeight, setFontWeight] = useState("normal");
  const [colorSelected, setColorSelected] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("arial");
  let streamer: any;

  if (session.data.mod) {
    streamer = session.data.modFor;
  } else {
    streamer = session.data.name;
  }

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
      <Button
        key={parsed.id}
        variant="contained"
        onClick={() => dispatch(setSelectedText(parsed.id))}
        sx={{ m: 0.5, width: 240 }}
      >
        {parsed?.input?.length > 20
          ? `${parsed.input.slice(0, 18)}...`
          : parsed.input}
      </Button>
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
      fontFamily: fontFamily,
    };

    const stringifyText = JSON.stringify(updatedText);

    dispatch(updateText(stringifyText));

    if (connected) {
      fetch("/api/textOverlaySocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-update-text",
          streamer: streamer,
          updatedText: stringifyText,
        }),
      });
    }
  };

  const syncHandler = async () => {
    if (connected) {
      fetch("/api/textOverlaySocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-fetch-texts",
          streamer: session.data.modFor,
        }),
      });
    }
  };

  const deleteHandler = () => {
    const filteredTexts = texts.filter((text: string) => {
      const parsed = JSON.parse(text);
      if (parsedSelected.id !== parsed.id) {
        return text;
      }
    });

    dispatch(subtractText(filteredTexts));

    const modStreamer = streamer;
    if (connected) {
      fetch("/api/textOverlaySocket", {
        method: "POST",
        body: JSON.stringify({
          emit: "req-delete-text",
          streamer: modStreamer,
          filteredTexts: filteredTexts,
        }),
      });
    }
  };

  return (
    <div className={styles.textOverlayContainer}>
      <div className={styles.buttonContainer}>{parsedTexts}</div>
      <div className={styles.textInputContainer}>
        <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", flexDirection: "column", marginRight: 5 }}
          >
            <Button
              disableElevation
              variant="contained"
              onClick={syncHandler}
              sx={{ width: 80, height: 60 }}
              disabled={connected ? false : true}
            >
              Fetch
            </Button>
            <Button
              disableElevation
              color="error"
              variant="contained"
              size="small"
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
          <Button
            variant="contained"
            onClick={updateFontHandler}
            sx={{ width: 80, height: 90 }}
            disableElevation
          >
            Submit
          </Button>
        </div>
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
          <div style={{ display: "flex" }}>
            <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
            <FontWeight fontWeight={fontWeight} setFontWeight={setFontWeight} />
          </div>
          <FontFamilySelector
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
          />
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
