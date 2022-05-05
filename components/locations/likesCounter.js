import React from "react";
import { useState } from "react";
import styles from "../../styles/travel.module.css";

//empty heart => "\u2661"
//filled heart => "\u2665"

const LikesCounter = ({ likes, id }) => {
  const [liked, setLiked] = useState(likes);
  const [toggleLiked, setToggleLiked] = useState(false);

  return (
    <div className={styles.likesContainer}>
      {toggleLiked === false ? (
        <button
          onClick={() => {
            setLiked(1);
            setToggleLiked(true);
          }}
        >
          {"\u2661"}
          {liked} likes
        </button>
      ) : (
        <button
          onClick={() => {
            setLiked(0);
            setToggleLiked(false);
          }}
        >
          {"\u2665"}
          {liked} unlike
        </button>
      )}
    </div>
  );
};

export default LikesCounter;
