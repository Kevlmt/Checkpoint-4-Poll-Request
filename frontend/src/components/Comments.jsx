/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import { NavLink } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import CommentsCard from "./CommentsCard";

export default function Comments({
  pollsId,
  currentCategory,
  fetchComments,
  comments,
}) {
  const { user } = useContext(UserContext);

  const sortComments = (array) => {
    const results = [];
    array.forEach((comment) => {
      const lastIndex = results.length - 1;
      let lastComment = null;
      if (results.length) {
        lastComment = results[lastIndex][results[lastIndex].length - 1];
      }

      if (results.length === 0 || lastComment.author_id !== comment.author_id) {
        results.push([comment]);
      } else if (lastComment.author_id === comment.author_id) {
        results[lastIndex].push(comment);
      }
    });
    return results;
  };

  useEffect(() => {
    fetchComments();
  }, [pollsId]);

  return (
    <section className="comment-list-container">
      <h1>You can debat here</h1>
      {comments && !comments.length ? <h3>No comments yet...</h3> : null}
      <ul className="comment-list">
        {comments &&
          sortComments(comments).map((groupComments, indexG) =>
            groupComments.map((comment) => (
              <CommentsCard key={comment.id} comment={comment} index={indexG} />
            ))
          )}
      </ul>
      <div className="create-comment-div">
        {user && (
          <NavLink
            to={`/?category=${currentCategory}&popup=comment&poll=${pollsId}`}
            className="create-comment-button"
          >
            Comment
          </NavLink>
        )}
      </div>
    </section>
  );
}
