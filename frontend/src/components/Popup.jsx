/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "@styles/Popup.scss";
import axios from "@services/axios";

export default function Popup({
  popup,
  categories,
  currentCategory,
  pollsId,
  fetchPolls,
  fetchComments,
}) {
  const [pollText, setPollText] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const [commentText, setCommentText] = useState(null);

  const navigate = useNavigate();

  const postPoll = async (e) => {
    e.preventDefault();
    const poll = {
      text: pollText,
      categories_id: parseInt(categoryId, 10),
    };
    try {
      const newPoll = await axios
        .post("polls", poll, {
          withCredentials: true,
        })
        .then((response) => response.data);
      if (newPoll) {
        fetchPolls();
        setPollText("");
        setCategoryId("");
        alert("poll posted");
        return navigate(`/?category=${currentCategory}`);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    const comment = {
      text: commentText,
    };
    try {
      const newComment = await axios
        .post(`comments/${pollsId}`, comment, {
          withCredentials: true,
        })
        .then((response) => response.data);
      if (newComment) {
        fetchComments();
        setCommentText("");
        return navigate(`/?category=${currentCategory}&poll=${pollsId}`);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handlePopup = () => {
    switch (popup) {
      case "createPoll":
        return (
          <div className="create-poll-container">
            <h1>Post a poll</h1>
            <form onSubmit={postPoll}>
              <div>
                <textarea
                  className="input"
                  type="text"
                  placeholder="Type here ..."
                  required
                  cols="30"
                  rows="10"
                  autoComplete="on"
                  value={pollText}
                  onChange={(e) => setPollText(e.target.value)}
                />
                <select
                  name="select-category"
                  id="select-category"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value={null}>---</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <button type="submit">Post</button>
            </form>
          </div>
        );
      case "comment":
        return (
          <div className="create-comment-container">
            <h1>Post a comment</h1>
            <form className="formadd-comment" onSubmit={postComment}>
              <textarea
                className="input"
                type="text"
                placeholder="Type here ..."
                required
                cols="30"
                rows="10"
                autoComplete="on"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit">Comment</button>
            </form>
          </div>
        );
      case "profil":
        return (
          <div>
            <p>bite</p>
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <section className="popup-container">
      <div className="popup-div">
        <NavLink
          to={
            pollsId !== null
              ? `/?category=${currentCategory}&poll=${pollsId}`
              : `/?category=${currentCategory}`
          }
          className="popup-close-button"
        >
          X
        </NavLink>
        {popup && handlePopup()}
      </div>
    </section>
  );
}
