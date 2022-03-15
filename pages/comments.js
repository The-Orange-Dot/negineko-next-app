import React, { useState } from "react";

const CommentsPage = () => {
  const [userInput, setUserInput] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch("/api/comments");
    const data = await res.json();
    setComments(data);
  };

  const submitComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: userInput }),
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };

  const deleteHandler = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="comment"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <button onClick={submitComment}>Submit</button>
      </div>
      <button onClick={fetchComments}>Load comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <button onClick={() => deleteHandler(comment.id)}>
              Delete Comment
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsPage;
