import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, ButtonGroup } from "@mui/material";
import styles from "../../styles/modControls.module.css";
import { setSelectedText } from "../../redux/actions/textOverlaySlice";
import FontWeight from "../Overlay/FontWeight";
import FontSizeSelector from "../Overlay/FontSizeSelector";
import { updateText, subtractText } from "../../redux/actions/textOverlaySlice";
import { CompactPicker } from "react-color";
import { TextDiractionalPad } from "../Overlay/TextDiractionalPad";
import { useSession } from "next-auth/react";

const TextControlPanel = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const connected = useSelector((state: any) => state.socket.connected);
  const texts = useSelector((state: any) => state.textOverlay.value);
  const selected = useSelector((state: any) => state.textOverlay.selected);
  const parsedSelected = selected ? JSON.parse(selected) : "";
  const [textInput, setTextInput] = useState(parsedSelected.input);
  const [fontSize, setFontSize] = useState(12);
  const [fontWeight, setFontWeight] = useState("normal");
  const [colorSelected, setColorSelected] = useState("#000000");
  let streamer: any;
  const [selectedButton, setSelectedButton] = useState("");

  console.log(connected);

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

    let textButton: string;

    if (parsed.input.length > 20) {
      textButton = `${parsed.input.slice(0, 18)}...`;
    } else if (parsed.input.trim().length < 1) {
      textButton = "(Empty button)";
    } else {
      textButton = parsed.input;
    }

    return (
      <Button
        key={parsed.id}
        fullWidth
        variant="contained"
        onClick={() => dispatch(setSelectedText(parsed.id))}
        sx={
          selectedButton === parsed.input
            ? { width: "90%", opacity: "60%" }
            : { width: "90%", opacity: 1 }
        }
      >
        {textButton}
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
    <div className={styles.mobileTextOverlayContainer}>
      <div className={styles.mobileButtonContainer}>{parsedTexts}</div>
      <div className={styles.mobileTextInputContainer}>
        <TextField
          sx={{ m: 0.5, width: 250 }}
          placeholder="Select a text to edit"
          size="small"
          multiline
          rows={3}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <div className={styles.mobileTextOverlayOptions}>
          <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
          <FontWeight fontWeight={fontWeight} setFontWeight={setFontWeight} />
        </div>
        <div>
          <CompactPicker onChange={setColorSelected} color={colorSelected} />
        </div>

        <div className={styles.mobileTextOverlayButtons}>
          <Button
            color="error"
            variant="contained"
            onClick={deleteHandler}
            sx={{ width: "40%" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ width: "40%" }}
            onClick={updateFontHandler}
          >
            Submit
          </Button>
        </div>

        <div className={styles.mobileDirectionalPadContainer}>
          <TextDiractionalPad />
        </div>
        <Button
          variant="contained"
          onClick={syncHandler}
          sx={{ height: 90, m: 1 }}
          disabled={connected ? false : true}
        >
          Fetch Texts
        </Button>
      </div>
    </div>
  );
};

export default TextControlPanel;
