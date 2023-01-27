/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";
import { CgCloseR } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import "./PollCardProfile.scss";

export default function PollCardProfile({ poll, user }) {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    return navigate(`/profile/${user.id}?editPoll=open&poll=${poll.id}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    return navigate(`/profile/${user.id}?deletePoll=open&poll=${poll.id}`);
  };

  return (
    <div className="pollcard-profile-container">
      {poll && poll.authorId === user.id ? (
        <NavLink
          to={`/home?category=Recent&poll=${poll.id}`}
          className="pollcard-profile-navlink"
        >
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
          <div className="pollcard-profile-content">
            <div>
              <p className="pollcard-profile-date">
                {poll.date.fullDMY} at {poll.date.hour}
              </p>
              <div className="pollcard-profile-edit-container">
                <button
                  type="button"
                  className="pollcard-profile-edit-button"
                  onClick={handleEdit}
                >
                  <FiEdit />
                </button>
                <button
                  type="button"
                  className="pollcard-profile-delete-button"
                  onClick={handleDelete}
                >
                  <CgCloseR />
                </button>
              </div>
            </div>
            <p className="pollcard-profile-text">{poll.text}</p>
          </div>
        </NavLink>
      ) : (
        <NavLink
          to={`/home?category=Recent&poll=${poll.id}`}
          className="pollcard-profile-navlink"
        >
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
          <div className="pollcard-profile-content">
            <p className="pollcard-profile-date">
              {poll.date.fullDMY} at {poll.date.hour}
            </p>
            <p className="pollcard-profile-text">{poll.text}</p>
          </div>
        </NavLink>
      )}
    </div>
  );
}
