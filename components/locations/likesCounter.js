import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import styles from "../../styles/travel.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, IconButton } from "@mui/material";

//empty heart => "\u2661"
//filled heart => "\u2665"

const LikesCounter = ({ likes, id, location, mobile }) => {
  const user = useSelector((state) => state.user.value);
  const locationName = location.name;
  const [liked, setLiked] = useState(likes);
  const [likedBool, setLikeBool] = useState(false);
  const [likeState, setLikeState] = useState(user.likes);
  const session = useSession();

  useEffect(
    () => {
      if (user.likes.includes(id)) {
        setLikeBool(true);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [likes, user]
  );

  const addLike = async (e) => {
    let updatedLiked;
    if (e === "add") {
      updatedLiked = "liked";
      setLiked(liked + 1);
    } else {
      updatedLiked = "unlike";
      setLiked(liked - 1);
    }

    fetch(`${server}/api/locations/${id}`, {
      method: "PATCH",
      headers: { key: "orange_is_orange" },
      body: updatedLiked,
    });
  };

  const addLocationToUserLikes = async (e) => {
    const username = session?.data?.user?.name;

    fetch(`${server}/api/users/${username}`, {
      method: "PATCH",
      headers: { key: "orange_is_orange" },
      body: JSON.stringify({ id: id, event: e }),
    });
  };

  return (
    <span
      className={mobile ? styles.mobilesLikesContainer : styles.likesContainer}
    >
      {!likedBool ? (
        <IconButton
          color="primary"
          fontSize="small"
          onClick={() => {
            if (session.status === "authenticated") {
              addLike("add");
              addLocationToUserLikes("add");
              setLikeBool(true);
            }
          }}
        >
          <p style={{ margin: 0, fontSize: "1rem" }}>{liked}</p>{" "}
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      ) : (
        <IconButton
          fontSize="small"
          onClick={() => {
            if (session.status === "authenticated") {
              addLike("subtract");
              addLocationToUserLikes("subtract");
              setLikeBool(false);
            }
          }}
        >
          <p style={{ margin: 0, fontSize: "1rem" }}>{liked}</p>
          <FavoriteIcon fontSize="small" />
        </IconButton>
      )}
    </span>
  );
};

export default LikesCounter;
