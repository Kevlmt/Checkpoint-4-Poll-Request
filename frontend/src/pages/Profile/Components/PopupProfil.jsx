/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import "./PopupProfile.scss";
import axios from "@services/axios";

export default function PopupProfil({ fetchUserInfo, userInfo, userId }) {
  const [pseudo, setPseudo] = useState(userInfo.pseudo);
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const modifySubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      try {
        await axios
          .put(
            `users/${userId}`,
            { pseudo },
            {
              withCredentials: true,
            }
          )
          .then((response) => response.data)
          .then(() => {
            setPseudo(null);
            setFile(null);
            fetchUserInfo();
            return navigate(-1);
          });
      } catch (err) {
        return alert(err.response.data);
      }
    } else {
      const user = new FormData();
      user.append("file", file);
      user.append("newUser", JSON.stringify({ pseudo }));
      try {
        await axios
          .put(`users/${userId}?file=users`, user, {
            withCredentials: true,
          })
          .then((response) => response.data)
          .then(() => {
            setPseudo(null);
            setFile(null);
            fetchUserInfo();
            return navigate(-1);
          });
      } catch (err) {
        return alert(err.response.data);
      }
    }
    return null;
  };

  return (
    <section className="popup-container">
      <div className="popup-div">
        <NavLink to={`/profile/${userId}`} className="popup-close-button">
          <RiCloseLine size={40} />
        </NavLink>
        <div className="edit-profile-popup">
          <h1>Edit your Profil</h1>
          <form onSubmit={modifySubmit}>
            <div>
              <input
                className="edit-profile-input"
                type="text"
                placeholder="Enter your pseudo"
                required
                autoComplete="on"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <label
                htmlFor="edit-profile-picture"
                className="edit-profile-label"
              >
                Change your profile picture
              </label>
              <input
                id="edit-profile-picture"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="edit-profile-input-file"
              />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview profile"
                  className="edit-profile-preview"
                />
              )}
            </div>
            <button type="submit">Apply</button>
          </form>
        </div>
      </div>
    </section>
  );
}
