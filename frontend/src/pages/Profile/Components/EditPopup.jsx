/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import axios from "../../../services/axios";
// import "./EditPopup.scss";

export default function EditPopup({ userId, query, fetchPolls }) {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  const [pollText, setPollText] = useState("");

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await axios
        .get("/categories", { withCredentials: true })
        .then((result) => result.data);
      if (data) {
        setCategories(data);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const fetchPoll = async () => {
    try {
      const dataFetched = await axios
        .get(`/polls/${query.get("poll")}`, { withCredentials: true })
        .then((response) => response.data);
      if (dataFetched) {
        setPollText(dataFetched.text);
        return setCategoryId(dataFetched.categoryId);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const editPoll = async (e) => {
    e.preventDefault();
    const poll = {
      text: pollText,
      categoryId: parseInt(categoryId, 10),
    };
    try {
      if (pollText && categoryId) {
        const newPoll = await axios
          .put(`polls/${query.get("poll")}`, poll, {
            withCredentials: true,
          })
          .then((response) => response.data);
        if (newPoll) {
          setPollText("");
          setCategoryId("");
          fetchPolls();
          return navigate(-1);
        }
        return null;
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPoll();
  }, []);

  return (
    <section className="popup-container">
      <div className="popup-div">
        <NavLink to={`/profile/${userId}`} className="popup-close-button">
          <RiCloseLine size={40} />
        </NavLink>
        <div className="create-poll-container">
          <h1>Edit Poll</h1>
          <form onSubmit={editPoll}>
            <div>
              <select
                name="select-category"
                id="select-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
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
            <button type="submit">Apply</button>
          </form>
        </div>
      </div>
    </section>
  );
}
