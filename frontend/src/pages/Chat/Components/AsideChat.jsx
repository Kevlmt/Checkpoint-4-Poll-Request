/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./AsideChat.scss";

export default function AsideChat({ isOpen, setIsOpen }) {
  return (
    <section className="aside-chat-container">
      <div
        className={isOpen ? "aside-chat-content opened" : "aside-chat-content"}
      >
        <p>aside chat</p>
      </div>
      {isOpen ? (
        <div className="aside-chat-backdrop" onClick={() => setIsOpen(false)} />
      ) : null}
    </section>
  );
}
