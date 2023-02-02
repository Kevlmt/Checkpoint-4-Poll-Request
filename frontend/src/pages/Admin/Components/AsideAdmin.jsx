/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import "./AsideAdmin.scss";

export default function AsideAdmin({ query }) {
  return (
    <div className="admin-aside-container">
      <div>
        <NavLink
          to="/admin?content=categories"
          className={
            query.get("content") === "categories"
              ? "admin-aside-navlink-active"
              : "admin-aside-navlink"
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/admin?content=users"
          className={
            query.get("content") === "users"
              ? "admin-aside-navlink-active"
              : "admin-aside-navlink"
          }
        >
          Users
        </NavLink>
      </div>
    </div>
  );
}
