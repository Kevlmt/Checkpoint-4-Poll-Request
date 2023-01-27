/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
// import { useContext } from "react";
import { NavLink } from "react-router-dom";
// import UserContext from "../../../contexts/UserContext";

import "./AsideHome.scss";

export default function AsideHome({
  categories,
  query,
  pollsId,
  currentCategory,
  isOpen,
  setIsOpen,
  setSelectedCategory,
  selectedCategory,
}) {
  return (
    <section className="aside-home-container">
      <div
        className={isOpen ? "aside-home-content opened" : "aside-home-content"}
      >
        <ul className="aside-home-category-list-container">
          <li>
            <NavLink
              to="/home?category=Popular"
              className={
                query.get("category") === `Popular`
                  ? "category-button-active"
                  : "category-button"
              }
              onClick={() => {
                setIsOpen(false);
                setSelectedCategory(null);
              }}
            >
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home?category=Recent"
              className={
                query.get("category") === `Recent`
                  ? "category-button-active"
                  : "category-button"
              }
              onClick={() => {
                setIsOpen(false);
                setSelectedCategory(null);
              }}
            >
              Recent
            </NavLink>
          </li>
          {categories &&
            categories.map((category) => (
              <li key={category.id}>
                <NavLink
                  to="/home?category=Category"
                  className={
                    selectedCategory === category.name
                      ? "category-button-active"
                      : "category-button"
                  }
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedCategory(category.name);
                  }}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
        </ul>
        <ul className="aside-category-personal-list">
          <li>
            <NavLink
              to="/home?category=Discover"
              className={
                query.get("category") === `Discover`
                  ? "category-button-active"
                  : "category-button"
              }
              onClick={() => {
                setIsOpen(false);
                setSelectedCategory(null);
              }}
            >
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home?category=Voted"
              className={
                query.get("category") === `Voted`
                  ? "category-button-active"
                  : "category-button"
              }
              onClick={() => {
                setIsOpen(false);
                setSelectedCategory(null);
              }}
            >
              Voted
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home?category=MyPolls"
              className={
                query.get("category") === `MyPolls`
                  ? "category-button-active"
                  : "category-button"
              }
              onClick={() => {
                setIsOpen(false);
                setSelectedCategory(null);
              }}
            >
              My Polls
            </NavLink>
          </li>
        </ul>
        <div className="create-poll-container">
          <div>
            <NavLink
              to={
                pollsId !== null
                  ? `/home?category=${currentCategory}&popup=createPoll`
                  : `/home?category=${currentCategory}&popup=createPoll`
              }
              className="create-poll-button"
              onClick={() => setIsOpen(false)}
            >
              New Poll
            </NavLink>
          </div>
        </div>
        <div className="cgu-container">
          <p>
            @Poll Request 2023
            <br />
            Confidentiality
            <br />
            General Conditions
          </p>
        </div>
      </div>
      {isOpen ? (
        <div className="aside-home-backdrop" onClick={() => setIsOpen(false)} />
      ) : null}
    </section>
  );
}
