/* eslint-disable import/no-unresolved */
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import "@styles/Header.scss";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      <div className="header-input-div">
        <input
          type="text"
          placeholder="Search poll ..."
          className="header-input"
        />
      </div>
      <h1 className="header-title">Poll Request</h1>
      {user ? (
        <NavLink to="/Profil" className="header-navlink-profil">
          <div className="header-div">
            {user.imgLink ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_ASSETS_URL}/images/users/${
                  user.imgLink
                }`}
                alt="profile"
              />
            ) : (
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_ASSETS_URL
                }/images/users/avatar.png`}
                alt="default"
              />
            )}
            <h3>{user.pseudo}</h3>
          </div>
        </NavLink>
      ) : (
        <NavLink to="/login" className="header-navlink-connection">
          <h3>Connection</h3>
        </NavLink>
      )}
    </header>
  );
}
