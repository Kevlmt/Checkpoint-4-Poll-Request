/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoMdCheckmark, IoIosAdd } from "react-icons/io";
import formatDate from "@services/dateFormat";
import axios from "@services/axios";
import UserContext from "../../../contexts/UserContext";
import PollCardProfile from "./PollCardProfile";
import "./ContentProfile.scss";
import EditPopup from "./EditPopup";
import DeletePopup from "./DeletePopup";
// import { RiContactsBookLine } from "react-icons/ri";

export default function ContentProfile({ userInfo, userId, query }) {
  const { user } = useContext(UserContext);
  const [polls, setPolls] = useState();

  const fetchPolls = async () => {
    try {
      const dataFetched = await axios
        .get(`/polls/users/${userId}`, { withCredentials: true })
        .then(async (result) => {
          const newPolls = result.data;
          await newPolls.forEach(async (poll) => {
            const date = formatDate(poll.date);
            // eslint-disable-next-line no-param-reassign
            poll.date = date;
            // eslint-disable-next-line no-param-reassign
            return poll;
          });
          return newPolls;
        });
      if (dataFetched) {
        return setPolls(dataFetched);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const [followedList, setFollowedList] = useState([]);
  const fetchFollowedList = async () => {
    try {
      const list = await axios
        .get("/users/followed", {
          withCredentials: true,
        })
        .then((response) => {
          const data = response.data.map((e) => e.authorId);
          return data;
        });
      if (list) {
        return setFollowedList(list);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      await axios
        .get(`/users/follow/${userId}`, {
          withCredentials: true,
        })
        .then(() => fetchFollowedList());
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleFollowDisplay = () => {
    if (followedList.includes(userId))
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
    fetchPolls();
    fetchFollowedList();
  }, [userId]);

  return (
    <div className="profile-content-container">
      {query.get("editPoll") === "open" && (
        <EditPopup userId={userId} query={query} fetchPolls={fetchPolls} />
      )}
      {query.get("deletePoll") === "open" && (
        <DeletePopup userId={userId} query={query} fetchPolls={fetchPolls} />
      )}
      {userInfo && (
        <div className="profile-card-container">
          {userInfo.id === userId ? (
            <NavLink
              to={`/profile/${userId}?editProfil=open`}
              className="edit-profile-button"
            >
              <HiOutlinePencilAlt />
              Edit
            </NavLink>
          ) : (
            handleFollowDisplay()
          )}
          <img
            src={
              userInfo.imgLink
                ? `${import.meta.env.VITE_BACKEND_ASSETS_URL}/images/users/${
                    userInfo.imgLink
                  }`
                : `${
                    import.meta.env.VITE_BACKEND_ASSETS_URL
                  }/images/users/avatar.png`
            }
            alt="avatar"
            className="profile-image"
          />
          <div>
            <h2>{userInfo.pseudo}</h2>
            <p> {userInfo.firstname}</p>
            <p>{userInfo.lastname}</p>
          </div>
        </div>
      )}
      <h1 className="profile-title">Activity</h1>
      {polls?.map((poll) => (
        <PollCardProfile
          poll={poll}
          userId={userId}
          user={user}
          key={poll.id}
          fetchPolls={fetchPolls}
        />
      ))}
      {polls?.length === 0 ? (
        <p className="nopolls-title">No polls yet...</p>
      ) : null}
    </div>
  );
}
