import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import styles from "../../styles/travel.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

//empty heart => "\u2661"
//filled heart => "\u2665"

const LikesCounter = ({ likes, id, location, username, setLoading }) => {
  const user = useSelector((state) => state.user.value);
  const locationName = location.name;
  const [liked, setLiked] = useState(likes);
  const [likedBool, setLikeBool] = useState(false);
  const [likeState, setLikeState] = useState([]);
  const session = useSession();

  useEffect(() => {
    if (user.likes !== undefined) {
      setLikeState(user.likes.includes(locationName));
      if (user.likes.inclides(locationName)) {
        setLikeBool(true);
      }
    }
    setLoading(false);
  }, [user.likes, locationName, likedBool, likeState, setLoading]);

  const addLike = async () => {
    let updatedLikes;
    likedBool
      ? (updatedLikes = parseInt(likes - 1))
      : (updatedLikes = parseInt(likes + 1));
    const locationName = location.name;

    setLikeBool(!likedBool);

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
      {!likedBool ? (
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
