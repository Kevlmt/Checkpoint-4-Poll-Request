/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
// import axios from "@services/axios";
import "./AsideChat.scss";
import { useNavigate } from "react-router-dom";

export default function AsideChat({
  isOpen,
  setIsOpen,
  userId,
  query,
  usersList,
}) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleClick = (id) => {
    setIsOpen(false);
    return navigate(`/chat?user=${id}`);
  };

  return (
    <section className="aside-chat-container">
      <div
        className={isOpen ? "aside-chat-content opened" : "aside-chat-content"}
      >
        <div className="aside-chat-header">
          <h1>Conversations</h1>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="search conversations"
          />
        </div>
        <div className="aside-list-container">
          {usersList &&
            usersList
              .filter((user) => user.id !== userId)
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
                  <div
                    key={user.id}
                    onClick={() => handleClick(user.id)}
                    className={
                      parseInt(query.get("user"), 10) === user.id
                        ? "aside-chat-card"
                        : null
                    }
                  >
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
        <div className="aside-chat-backdrop" onClick={() => setIsOpen(false)} />
      ) : null}
    </section>
  );
}
