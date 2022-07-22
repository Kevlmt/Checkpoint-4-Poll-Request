/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "@styles/Aside.scss";

export default function Aside({ categories, query, pollsId, currentCategory }) {
  const { user } = useContext(UserContext);
  return (
    <section className="aside-container">
      <h1 className="aside-title">Categories</h1>
      <input
        type="text"
        placeholder="search category..."
        className="aside-search-category"
      />
      <ul className="aside-category-list-container">
        <li>
          <NavLink
            to="/?category=Popular"
            className={
              query.get("category") === `Popular`
                ? "categories-button-active"
                : "categories-button"
            }
          >
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/?category=Recent"
            className={
              query.get("category") === `Recent`
                ? "categories-button-active"
                : "categories-button"
            }
          >
            Recent
          </NavLink>
        </li>
        {categories &&
          categories.map((category) => (
            <li key={category.id}>
              <NavLink
                to={`/?category=${category.name}`}
                className={
                  query.get("category") === `${category.name}`
                    ? "categories-button-active"
                    : "categories-button"
                }
              >
                {category.name}
              </NavLink>
            </li>
          ))}
      </ul>
      {user && (
        <ul className="aside-category-pasencorefaite">
          <li>
            <NavLink
              to="/?category=Discover"
              className={
                query.get("category") === `Discover`
                  ? "categories-button-active"
                  : "categories-button"
              }
            >
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/?category=Voted"
              className={
                query.get("category") === `Voted`
                  ? "categories-button-active"
                  : "categories-button"
              }
            >
              Voted
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/?category=MyPolls"
              className={
                query.get("category") === `MyPolls`
                  ? "categories-button-active"
                  : "categories-button"
              }
            >
              My Polls
            </NavLink>
          </li>
        </ul>
      )}

      <div className="create-poll-div">
        {user && (
          <NavLink
            to={
              pollsId !== null
                ? `/?category=${currentCategory}&poll=${pollsId}&popup=createPoll`
                : `/?category=${currentCategory}&popup=createPoll`
            }
            className="create-poll-button"
          >
            Create a Poll
          </NavLink>
        )}
      </div>
    </section>
  );
}
