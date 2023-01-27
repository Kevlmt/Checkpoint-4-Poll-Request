/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./CommentCard.scss";

export default function CommentCard({ comment, comments, index }) {
  useEffect(() => {}, []);
  return (
    <div
      className={
        // eslint-disable-next-line no-unsafe-optional-chaining
        index === comments?.length - 1
          ? "comment-card-container last-comment"
          : "comment-card-container"
      }
    >
      <div className="comment-card-info-container">
        <NavLink
          to={`/profile/${comment.authorId}`}
          className="comment-card-author"
        >
          {comment.pseudo}
        </NavLink>
        <p className="comment-card-date">
          {comment.date.fullDMY} at {comment.date.hour}
        </p>
      </div>
      <div>
        <p className="comment-card-text">{comment.text}</p>
      </div>
    </div>
  );
}
