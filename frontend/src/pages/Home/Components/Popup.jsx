/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "@services/axios";
import { RiCloseLine } from "react-icons/ri";
import "./Popup.scss";

export default function Popup({
  popup,
  categories,
  currentCategory,
  pollId,
  fetchPolls,
}) {
  const [pollText, setPollText] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  const navigate = useNavigate();

  const postPoll = async (e) => {
    e.preventDefault();
    const poll = {
      text: pollText,
      categoryId: parseInt(categoryId, 10),
    };
    try {
      if (pollText && categoryId) {
        const newPoll = await axios
          .post("polls", poll, {
            withCredentials: true,
          })
          .then((response) => response.data);
        if (newPoll) {
          fetchPolls();
          setPollText("");
          setCategoryId("");
          // alert("poll posted");
          return navigate(`/home?category=${currentCategory}`);
        }
        return null;
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  return (
    <section className="popup-container">
      <NavLink
        to={
          pollId !== null
            ? `/home?category=${currentCategory}&poll=${pollId}`
            : `/home?category=${currentCategory}`
        }
        className="popup-close-button"
      >
        <RiCloseLine size={40} />
      </NavLink>
      <div className="popup-div">
        {popup && (
          <div className="create-poll-container">
            <h1>Create a new PR</h1>
            <form onSubmit={postPoll}>
              <div>
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
                <textarea
                  className="input"
                  type="text"
                  placeholder="What's new ?"
                  required
                  cols="30"
                  rows="10"
                  autoComplete="on"
                  value={pollText}
                  onChange={(e) => setPollText(e.target.value)}
                />
              </div>
              <button type="submit">Post</button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
