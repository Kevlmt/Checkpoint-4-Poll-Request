/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";
import { ImWarning } from "react-icons/im";
import { RiCloseLine } from "react-icons/ri";
import axios from "../../../services/axios";
import "./DeletePopup.scss";

export default function DeletePopup({ userId, query, fetchPolls }) {
  const navigate = useNavigate();
  const handleCancel = () => {
    return navigate(-1);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/polls/${query.get("poll")}`, {
        withCredentials: true,
      });
      await fetchPolls();
      return navigate(-1);
    } catch (err) {
      return alert(err.response.data);
    }
  };
  return (
    <section className="popup-container">
      <div className="popup-div">
        <NavLink to={`/profile/${userId}`} className="popup-close-button">
          <RiCloseLine size={40} />
        </NavLink>
        <div className="delete-poll-container">
          <ImWarning size={40} color="red" />
          <h1>Do you want to delete this Poll ?</h1>
          <button
            type="button"
            className="popup-cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="popup-delete-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
