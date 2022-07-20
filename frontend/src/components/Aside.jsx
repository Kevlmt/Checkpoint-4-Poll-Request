/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { NavLink } from "react-router-dom";
import "@styles/Aside.scss";

export default function Aside({ categories }) {
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
          <NavLink to="/?content=Popular">Popular</NavLink>
        </li>
        {categories &&
          categories.map((category) => (
            <li key={category.id}>
              <NavLink to={`/?content=${category.name}`}>
                {category.name}
              </NavLink>
            </li>
          ))}
      </ul>
      <ul className="aside-category-pasencorefaite">
        <li>
          <NavLink to="/?content=Favorites">Favorites</NavLink>
        </li>
        <li>
          <NavLink to="/?content=Voted">Voted</NavLink>
        </li>
        <li>
          <NavLink to="/?content=Followed">Followed</NavLink>
        </li>
      </ul>
      <NavLink to="/?popup=create" className="create-poll-button">
        Create a Poll
      </NavLink>
    </section>
  );
}
