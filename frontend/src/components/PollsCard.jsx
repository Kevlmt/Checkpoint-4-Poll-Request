/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "@services/axios";
import UserContext from "../contexts/UserContext";
import "@styles/PollsCard.scss";

export default function PollsCard({ poll, currentCategory, fetchPolls }) {
  const { user } = useContext(UserContext);

  const handleAgree = async (e) => {
    e.preventDefault();
    const agreeData = {
      polls_id: poll.id,
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
      polls_id: poll.id,
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
    if (user) {
      if (poll.usersAgree.includes(user.id)) {
        return <p>You Agreed</p>;
      }
      if (poll.usersDisagree.includes(user.id)) {
        return <p>You Disagreed</p>;
      }
      return null;
    }
    return null;
  };

  const handleButtonDisplay = () => {
    if (user) {
      if (
        poll.usersAgree.includes(user.id) ||
        poll.usersDisagree.includes(user.id)
      ) {
        return (
          <div className="polls-card-count-container">
            <p className="agree-count">
              {(poll.usersAgree.length /
                (poll.usersAgree.length + poll.usersDisagree.length)) *
                100}
              % Agree
            </p>
            <p className="disagree-count">
              {(poll.usersDisagree.length /
                (poll.usersAgree.length + poll.usersDisagree.length)) *
                100}
              % Disagree
            </p>
          </div>
        );
      }
      return (
        <div className="polls-card-button-container">
          <button type="button" className="agree-button" onClick={handleAgree}>
            Agree
          </button>
          <button
            type="button"
            className="disagree-button"
            onClick={handleDisagree}
          >
            Disagree
          </button>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    handleButtonDisplay();
  }, [handleAgree, handleDisagree]);

  return (
    <NavLink
      to={`/?category=${currentCategory}&poll=${poll.id}`}
      className="polls-card-container"
    >
      <div className="polls-avatar-div">
        {poll?.author_imgLink ? (
          <img
            src={`${import.meta.env.VITE_BACKEND_ASSETS_URL}/images/users/${
              poll.author_imgLink
            }`}
            alt="avatar"
            className="avatarImg"
          />
        ) : (
          <img
            src={`${
              import.meta.env.VITE_BACKEND_ASSETS_URL
            }/images/users/avatar.png`}
            alt="avatar"
            className="avatarImg"
          />
        )}
      </div>
      <div className="polls-info-container">
        <div className="polls-author-div">
          <p className="polls-author">{poll.author}</p>
          <p>{handleAgreeDisplay()}</p>
        </div>
        <p className="polls-text">{poll.text}</p>
        <div className="polls-bottom-div">
          {handleButtonDisplay()}
          <p>
            {poll.date.fullDMY} at {poll.date.hour}
          </p>
        </div>
      </div>
    </NavLink>
  );
}
