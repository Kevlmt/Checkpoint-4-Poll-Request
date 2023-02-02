/* eslint-disable react/prop-types */
import { useEffect } from "react";
import CategoriesContent from "./CategoriesContent";
import UsersContent from "./UsersContent";
import "./ContentAdmin.scss";

export default function ContentAdmin({ query }) {
  const handleContent = () => {
    if (query.get("content") === "categories") {
      return <CategoriesContent query={query} />;
    }
    if (query.get("content") === "users") {
      return <UsersContent />;
    }
    return null;
  };

  useEffect(() => {
    handleContent();
  }, [query]);

  return <div className="admin-content-container">{handleContent()}</div>;
}
