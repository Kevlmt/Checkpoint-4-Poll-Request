/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "@styles/Aside.scss";

export default function Aside({ categories, query, currentCategory }) {
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
      <ul className="aside-category-pasencorefaite">
        <li>
          <NavLink
            to="/?category=Favorites"
            className={
              query.get("category") === `Favorites`
                ? "categories-button-active"
                : "categories-button"
            }
          >
            Favorites
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
            to="/?category=Followed"
            className={
              query.get("category") === `Followed`
                ? "categories-button-active"
                : "categories-button"
            }
          >
            Followed
          </NavLink>
        </li>
      </ul>
      <div className="create-poll-div">
        {user && (
          <NavLink
            to={
              query.get("category")
                ? `/?category=${currentCategory}&popup=createPoll`
                : "/?popup=createPoll"
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
