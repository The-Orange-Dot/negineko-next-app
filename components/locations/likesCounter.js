import React from "react";
import { server } from "../../config/index";
import { useState } from "react";
import styles from "../../styles/travel.module.css";

//empty heart => "\u2661"
//filled heart => "\u2665"

const LikesCounter = ({ likes, id, location, username }) => {
  const [liked, setLiked] = useState(likes);
  const [toggleLiked, setToggleLiked] = useState(false);

  const addLike = async (e) => {
    // console.log(location.likes);
    // console.log(likes);

    const locationRes = await fetch(`${server}/api/locations/${id}`, {
      method: "PUT",
      body: JSON.stringify({ likes: likes + 1 }),
      header: {
        "Content-type": "application/json",
      },
    });

    // const userRes = await fetch(`${server}/api/users/${username}`, {
    //   method: "POST",
    //   body: JSON.stringify(),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    const locationData = await locationRes.json();
    // const userData = await userRes.json();
    console.log(`Location ${id}: ${locationData}`);
    // console.log(`User: ${userData}`);
  };

  return (
    <div className={styles.likesContainer}>
      {toggleLiked === false ? (
        <button
          onClick={(e) => {
            setLiked(liked + 1);
            setToggleLiked(true);
            addLike(e);
          }}
        >
          {"\u2661"}
          {liked} likes
        </button>
      ) : (
        <button
          onClick={() => {
            setLiked(liked - 1);
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
