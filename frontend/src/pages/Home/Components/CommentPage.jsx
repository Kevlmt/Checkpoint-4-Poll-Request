/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "@services/axios";
import formatDate from "@services/dateFormat";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { IoIosAdd, IoMdCheckmark } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import CommentCard from "./CommentCard";
import "./CommentPage.scss";

export default function CommentPage({
  pollId,
  fetchComments,
  comments,
  fetchFollowedList,
  followedList,
}) {
  const { user } = useContext(UserContext);
  const [poll, setPoll] = useState(null);

  const fetchPoll = async () => {
    try {
      const dataFetched = await axios
        .get(`/polls/${pollId}`, { withCredentials: true })
        .then((response) => {
          const { data } = response;
          const newDate = formatDate(data.date);
          /* eslint-disable-next-line */
          data.date = newDate;
          return data;
        });
      if (dataFetched) {
        return setPoll(dataFetched);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleAgree = async (e) => {
    e.preventDefault();
    const agreeData = {
      pollId: poll.id,
    };
    try {
      await axios
        .post("/polls/agree", agreeData, {
          withCredentials: true,
        })
        .then(() => fetchPoll());
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleDisagree = async (e) => {
    e.preventDefault();
    const disagreeData = {
      pollId: poll.id,
    };
    try {
      await axios
        .post("/polls/disagree", disagreeData, {
          withCredentials: true,
        })
        .then(() => fetchPoll());
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleAgreeDisplay = () => {
    if (poll?.authorId === user.id) return null;
    if (poll?.userAgree === true) {
      return <p className="agreed-text">You Agreed</p>;
    }
    if (poll?.userDisagree === true) {
      return <p className="agreed-text">You Disagreed</p>;
    }
    return null;
  };

  const handleButtonDisplay = () => {
    if (poll?.userAgree === true || poll?.userDisagree === true) {
      return (
        <div className="pollcard-agree-stats-container">
          {(poll.usersAgree.length /
            (poll.usersAgree.length + poll.usersDisagree.length)) *
            100 >
          49 ? (
            <p className="agree-count">
              {Math.round(
                (poll.usersAgree.length /
                  (poll.usersAgree.length + poll.usersDisagree.length)) *
                  100
              )}
              % Agree
            </p>
          ) : (
            <p className="disagree-count">
              {Math.round(
                (poll.usersDisagree.length /
                  (poll.usersAgree.length + poll.usersDisagree.length)) *
                  100
              )}
              % Disagree
            </p>
          )}
          {handleAgreeDisplay()}
        </div>
      );
    }
    return (
      <div className="pollcard-agree-button-container">
        <button type="button" className="agree-button" onClick={handleAgree}>
          <FiThumbsUp /> <span className="agree">Agree</span>
        </button>
        <button
          type="button"
          className="disagree-button"
          onClick={handleDisagree}
        >
          <FiThumbsDown /> <span className="disagree">Disagree</span>
        </button>
      </div>
    );
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      await axios
        .get(`/users/follow/${poll.authorId}`, {
          withCredentials: true,
        })
        .then(() => fetchFollowedList());
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleFollowDisplay = () => {
    if (user.id === poll?.authorId) return null;
    if (followedList.includes(poll?.authorId))
      return (
        <p className="followed">
          <IoMdCheckmark /> followed
        </p>
      );
    return (
      <button type="button" className="follow-button" onClick={handleFollow}>
        <IoIosAdd />
        Follow
      </button>
    );
  };

  useEffect(() => {
    fetchComments();
    fetchPoll();
  }, [pollId]);

  useEffect(() => {
    handleButtonDisplay();
  }, [handleAgree, handleDisagree]);

  return (
    <section className="comment-page">
      <div className="comment-page-poll-container">
        <div className="comment-page-poll-header">
          <div className="comment-page-author-info">
            {poll?.authorImgLink ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_ASSETS_URL}/images/users/${
                  poll.authorImgLink
                }`}
                alt="avatar"
                className="pollcard-img"
              />
            ) : (
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_ASSETS_URL
                }/images/users/avatar.png`}
                alt="avatar"
                className="pollcard-img"
              />
            )}
            <div>
              <NavLink to={`/profile/${poll?.authorId}`}>
                {poll?.author}
              </NavLink>
              <span className="poll-date">{poll?.date.fullDMY}</span>
            </div>
          </div>
          {handleFollowDisplay()}
        </div>
        <div className="comment-page-poll-info">
          <p className="comment-page-poll-text">{poll && poll.text}</p>
          {handleButtonDisplay()}
          <div className="comment-page-poll-comment-count">
            <p>
              {comments?.length > 1
                ? `${comments.length} comments`
                : `${comments.length} comment`}
            </p>
          </div>
        </div>
      </div>
      {comments &&
        comments
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((comment, index) => {
            return (
              <CommentCard
                comment={comment}
                key={comment.id}
                index={index}
                comments={comments}
              />
            );
          })}
    </section>
  );
}
