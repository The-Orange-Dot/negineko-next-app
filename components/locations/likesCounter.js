import React from "react";
import styles from "../../styles/travel.module.css";
import { server } from "../../config/index";
import { useSelector, useDispatch } from "react-redux";
import { addLike, subtractLike } from "../../redux/actions/likeSlice";

//empty heart => "\u2661"
//filled heart => "\u2665"

const LikesCounter = ({ likes, id }) => {
  const likesState = useSelector((state) => state.counter.count);
  const liked = useSelector((state) => state.counter.liked);
  const dispatch = useDispatch();

  const likeHandler = async () => {
    const addLike = await fetch(`${server}/api/locations/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify((likes += 1)),
    });
  };

  return (
    <div className={styles.likesContainer}>
      {liked === false ? (
        <button onClick={() => dispatch(addLike())}>
          {"\u2661"}
          {likesState} likes
        </button>
      ) : (
        <button onClick={() => dispatch(subtractLike())}>
          {"\u2665"}
          {likesState} unlike
        </button>
      )}
    </div>
  );
};

export default LikesCounter;
