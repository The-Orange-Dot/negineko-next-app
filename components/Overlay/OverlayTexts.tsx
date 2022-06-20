import React, { useEffect, useState } from "react";
import OverlayComponent from "./OverlayComponent";
import { useDispatch, useSelector } from "react-redux";

const TextOverlay = ({ parentRef }) => {
  const textOverlay = useSelector((state: any) => state.textOverlay.value);
  const [texts, setTexts] = useState([]);
  const dispatch = useDispatch();

  useEffect(
    () => {
      const textsOverlay = textOverlay.map((data: string) => {
        const text = JSON.parse(data);

        return (
          <OverlayComponent
            key={text.id}
            id={text.id}
            fontSize={text.fontSize}
            color={text.color}
            fontWeight={text.fontWeight}
            textInput={text.input}
            position={text.position}
            parentRef={parentRef}
          />
        );
      });
      setTexts(textsOverlay);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [textOverlay, dispatch]
  );

  return texts;
};

export default TextOverlay;
