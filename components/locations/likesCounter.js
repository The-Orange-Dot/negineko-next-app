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

  console.log(likes);

  useEffect(() => {
    if (session.data) {
      setLikeState(session.data.likes);

      if (likeState?.includes(locationName)) {
        setLikeBool(true);
      }
    }
  }, [
    user.likes,
    locationName,
    likedBool,
    likeState,
    setLoading,
    session.data,
  ]);

  const updateLocationLike = () => {
    const updatedArray = user.likes.filter((location) => {
      return location !== locationName;
    });

    setLikeState(updatedArray);
  };

  const addLike = async (e) => {
    let updatedLiked;
    if (e === "add") {
      updatedLiked = liked + 1;
      setLiked(liked + 1);
    } else {
      updatedLiked = liked - 1;
      setLiked(liked - 1);
    }

    const locationName = location.name;

    setLikeBool(!likedBool);
    await axios({
      method: "PATCH",
      url: `${server}/api/locations/${id}`,
      data: {
        updatedLiked,
      },
    }); //.then((res) => console.log(res));

    await axios({
      method: "PATCH",
      url: `${server}/api/users/${username}`,
      data: {
        locationName,
      },
    }); //.then((res) => console.log(res));
  };

  return (
    <div className={styles.likesContainer}>
      {!likedBool ? (
        <button
          onClick={async () => {
            if (session.status === "authenticated") {
              addLike("add");
            }
          }}
        >
          {"\u2661"}
          {liked} likes
        </button>
      ) : (
        <button
          onClick={async () => {
            if (session.status === "authenticated") {
              await addLike("subtract");
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
