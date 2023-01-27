/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import "./AsideChat.scss";

export default function AsideChat({ isOpen, setIsOpen }) {
  const [searchValue, setSearchValue] = useState("");

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
      </div>
      {isOpen ? (
        <div className="aside-chat-backdrop" onClick={() => setIsOpen(false)} />
      ) : null}
    </section>
  );
}
