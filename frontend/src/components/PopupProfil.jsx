/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "@styles/Popup.scss";
import axios from "@services/axios";

export default function PopupProfil({ fetchUserInfo, userInfo }) {
  const [pseudo, setPseudo] = useState(null);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const modifySubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      try {
        await axios
          .put(
            `users/${userInfo.id}`,
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
            return navigate("/profil");
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
          .put(`users/${userInfo.id}?file=users`, user, {
            withCredentials: true,
          })
          .then((response) => response.data)
          .then(() => {
            setPseudo(null);
            setFile(null);
            fetchUserInfo();
            return navigate("/profil");
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
        <NavLink to="/profil" className="popup-close-button">
          X
        </NavLink>
        <div className="popup-modify-1">
          <h1>Edit your Profil</h1>
          <form onSubmit={modifySubmit}>
            <div className="popup-modify">
              <input
                className="input"
                type="text"
                placeholder="Enter your pseudo"
                required
                autoComplete="on"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="input-file"
              />
            </div>
            <button type="submit">Apply</button>
          </form>
        </div>
      </div>
    </section>
  );
}
