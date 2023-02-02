/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "@services/axios";
import AdminPopup from "./AdminPopup";

export default function CategoriesContent({ query }) {
  const [searchValue, setSearchValue] = useState("");

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const data = await axios
        .get("/categories", { withCredentials: true })
        .then((result) => result.data);
      if (data) {
        setCategories(data);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="categories-content-container">
      {query.get("popup") && (
        <AdminPopup
          id={query.get("categoryId")}
          popup={query.get("popup")}
          name={query.get("categoryName")}
          fetchCategories={fetchCategories}
        />
      )}
      <div className="admin-input-container">
        <input
          type="text"
          placeholder="search a category"
          className="admin-search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <NavLink
          type="button"
          className="admin-add-button"
          to="/admin?content=categories&popup=add"
        >
          Add
        </NavLink>
      </div>
      <div className="categories-list">
        {categories &&
          categories
            .filter((category) =>
              category.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((category) => (
              <div className="category-card" key={category.id}>
                <p>{category.name}</p>
                <div>
                  <NavLink
                    to={`/admin?content=categories&popup=edit&categoryId=${category.id}&categoryName=${category.name}`}
                    type="button"
                    className="admin-button-edit"
                  >
                    Edit
                  </NavLink>
                  <NavLink
                    type="button"
                    to={`/admin?content=categories&popup=delete&categoryId=${category.id}`}
                    className="admin-button-delete"
                  >
                    Delete
                  </NavLink>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
