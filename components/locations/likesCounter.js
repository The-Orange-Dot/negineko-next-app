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
  const [likeState, setLikeState] = useState(user.likes);
  const session = useSession();

  useEffect(() => {
    // setLikeState(user.likes.includes(locationName));
    if (likeState) {
      if (likeState.includes(locationName)) {
        setLikeBool(true);
      }
    }
    setLoading(false);
  }, [user.likes, locationName, likedBool, likeState, setLoading]);

  const updateLocationLike = () => {
    const updatedArray = user.likes.filter((location) => {
      return location !== locationName;
    });

    setLikeState(updatedArray);
  };

  const addLike = async (e) => {
    let updatedLikes;
    e === "add"
      ? (updatedLikes = parseInt(likes + 1))
      : (updatedLikes = parseInt(likes - 1));
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
            if (session.status !== null || session.status !== undefined) {
              setLiked(liked + 1);
              addLike("add");
            }
          }}
        >
          {"\u2661"}
          {liked} likes
        </button>
      ) : (
        <button
          onClick={() => {
            if (session.status !== null || session.status !== undefined) {
              setLiked(liked - 1);
              addLike("subtract");
              setLikeBool(false);
              updateLocationLike();
            }
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
