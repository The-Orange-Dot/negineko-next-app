import React from "react";
import { server } from "../../config/index";
import { useState } from "react";
import styles from "../../styles/travel.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

//empty heart => "\u2661"
//filled heart => "\u2665"

const LikesCounter = ({ likes, id, location, username }) => {
  const user = useSelector((state) => state.user.value);
  const locationName = location.name;
  const [liked, setLiked] = useState(likes);
  const [likeState, setLikeState] = useState([]);

  useEffect(() => {
    if (user.likes !== undefined) {
      setLikeState(user.likes.includes(locationName));
    }
  }, [user.likes, locationName]);

  const addLike = async () => {
    const updatedLikes = parseInt(likes + 1);
    const locationName = location.name;

    axios({
      method: "PATCH",
      url: `${server}/api/locations/${id}`,
      data: {
        updatedLikes,
      },
    });

    axios({
      method: "PATCH",
      url: `${server}/api/users/${username}`,
      data: {
        locationName,
      },
    });
  };

  return (
    <div className={styles.likesContainer}>
      {!likeState ? (
        <button
          onClick={() => {
            setLiked(liked + 1);
            addLike();
          }}
        >
          {"\u2661"}
          {liked} likes
        </button>
      ) : (
        <button
          onClick={() => {
            setLiked(liked - 1);
            addLike();
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
