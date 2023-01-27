/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "@services/axios";
import { IoIosAdd, IoMdCheckmark } from "react-icons/io";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import UserContext from "../../../contexts/UserContext";
import "./PollsCard.scss";

export default function PollsCard({
  poll,
  currentCategory,
  fetchPolls,
  fetchFollowedList,
  followedList,
}) {
  const { user } = useContext(UserContext);

  const [commentLength, setCommentLenght] = useState(0);
  const searchLength = async () => {
    const commentfetch = await axios
      .get(`/polls/getcommentlength/${poll.id}`, {
        withCredentials: true,
      })
      .then((result2) => {
        return result2.data.commentLength;
      });
    // eslint-disable-next-line no-param-reassign
    if (commentfetch) {
      setCommentLenght(commentfetch);
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
        .then(() => fetchPolls());
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
        .then(() => fetchPolls());
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleAgreeDisplay = () => {
    if (poll?.authorId === user.id) return null;
    if (poll.usersAgree.includes(user.id)) {
      return <p className="agreed-text">You Agreed</p>;
    }
    if (poll.usersDisagree.includes(user.id)) {
      return <p className="agreed-text">You Disagreed</p>;
    }
    return null;
  };

  const handleButtonDisplay = () => {
    if (
      poll?.usersAgree.includes(user.id) ||
      poll?.usersDisagree.includes(user.id)
    ) {
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
    if (user.id === poll.authorId) return null;
    if (followedList.includes(poll.authorId))
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
    searchLength();
  }, [fetchPolls]);

  useEffect(() => {
    handleButtonDisplay();
  }, [handleAgree, handleDisagree]);

  return (
    <NavLink
      to={`/home?category=${currentCategory}&poll=${poll.id}`}
      className="pollcard-container"
    >
      <div className="pollcard-header">
        <div>
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

          <p>
            <NavLink to={`/profile/${poll?.authorId}`}>{poll.author}</NavLink>
            <br />
            <span>
              {poll.date.fullDMY} at {poll.date.hour}
            </span>
          </p>
        </div>
        {handleFollowDisplay()}
      </div>
      <div className="pollcard-content">
        <p className="poll-text">{poll.text}</p>
        {handleButtonDisplay()}
        <div>
          <p>
            {commentLength > 1
              ? `${commentLength} comments`
              : `${commentLength} comment`}
          </p>
        </div>
      </div>
    </NavLink>
  );
}
