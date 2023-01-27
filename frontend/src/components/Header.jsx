/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import { useContext } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { ImArrowLeft2 } from "react-icons/im";
import { TbMessages } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import UserContext from "../contexts/UserContext";

export default function Header({
  isOpen,
  setIsOpen,
  currentCategory,
  poll,
  fetchPolls,
  handleLogout,
}) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-title-container">
        {poll ? (
          <button
            type="button"
            onClick={() => {
              fetchPolls();
              navigate(-1);
            }}
            className="comment-page-navback"
          >
            <ImArrowLeft2 size={35} />{" "}
            {/* <span className="comment-page-back">Back</span> */}
          </button>
        ) : isOpen ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="navButton rotate90"
          >
            <span className="menuLogoBars cross" />
            <span className="menuLogoBars crossInverted" />
            <span className="menuLogoBars hide" />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="navButton"
          >
            <span className="menuLogoBars" />
            <span className="menuLogoBars" />
            <span className="menuLogoBars" />
          </button>
        )}
        <h1 className="header-title">
          <NavLink to="/" className="header-title">
            Poll Request
          </NavLink>
        </h1>
        {location.pathname === `/profile/${user.id}` && (
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            <MdLogout size={30} />
          </button>
        )}
      </div>
      <div className="header-nav-container">
        <NavLink
          to={
            currentCategory
              ? `/home?category=${currentCategory}`
              : "/home?category=Recent"
          }
          className="header-nav-navlink"
        >
          <div className="header-nav-button-container">
            <AiOutlineHome size={35} />
            Home
          </div>
        </NavLink>
        <NavLink to="/chat" className="header-nav-navlink">
          <div className="header-nav-button-container">
            <TbMessages size={35} />
            Chat
          </div>
        </NavLink>
        <NavLink to={`/profile/${user.id}`} className="header-nav-navlink">
          <div className="header-nav-button-container">
            <AiOutlineUser size={35} />
            Profile
          </div>
        </NavLink>
        {user?.role === "ADMIN" && (
          <NavLink to="/admin" className="header-nav-navlink admin">
            <div className="header-nav-button-container">
              <BsShieldLock size={35} />
              Admin
            </div>
          </NavLink>
        )}
      </div>
    </header>
  );
}
