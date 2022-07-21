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
  query,
  fetchPolls,
}) {
  const [pollText, setPollText] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const [commentText, setCommentText] = useState(null);
  const [pollId, setPollId] = useState(null);

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
        return navigate(
          query.get("category") ? `/?category=${currentCategory}` : "/"
        );
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
                <input
                  className="input"
                  type="text"
                  placeholder="Type here ..."
                  required
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
            <form onSubmit={postPoll}>
              <div>
                <input
                  className="input"
                  type="text"
                  placeholder="Type here ..."
                  required
                  autoComplete="on"
                  value={pollText}
                  onChange={(e) => setPollText(e.target.value)}
                />
              </div>
              <button type="submit">Comment</button>
            </form>
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
          to={query.get("category") ? `/?category=${currentCategory}` : "/"}
          className="popup-close-button"
        >
          X
        </NavLink>
        {popup && handlePopup()}
      </div>
    </section>
  );
}
