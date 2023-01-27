/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AsideProfile.scss";

export default function AsideProfile({ isOpen, setIsOpen, usersList }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleUserClick = (user) => {
    navigate(`/profile/${user.id}`);
    return setIsOpen(false);
  };

  return (
    <section className="aside-profile-container">
      <div
        className={
          isOpen ? "aside-profile-content opened" : "aside-profile-content"
        }
      >
        <div className="aside-profile-header">
          <h1>Find Someone</h1>
          <input
            type="text"
            placeholder="Example: John Doe"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="aside-users-list-container">
          {usersList &&
            usersList
              // .sort(() => {
              //   if (searchValue === "") return Math.random() - 0.5;
              //   return null;
              // })
              .filter(
                (user) =>
                  user.pseudo
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  user.firstname
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  user.email
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  user.lastname
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              )
              .map((user) => {
                return (
                  <div onClick={() => handleUserClick(user)} key={user.id}>
                    <img
                      src={
                        user.imgLink
                          ? `${
                              import.meta.env.VITE_BACKEND_ASSETS_URL
                            }/images/users/${user.imgLink}`
                          : `${
                              import.meta.env.VITE_BACKEND_ASSETS_URL
                            }/images/users/avatar.png`
                      }
                      alt="avatar"
                      className="aside-image"
                    />
                    <p>
                      {user.pseudo} <br />
                      <span>
                        {user.firstname} {user.lastname}
                      </span>
                    </p>
                  </div>
                );
              })}
        </div>
      </div>
      {isOpen ? (
        <div
          className="aside-profile-backdrop"
          onClick={() => setIsOpen(false)}
        />
      ) : null}
    </section>
  );
}
