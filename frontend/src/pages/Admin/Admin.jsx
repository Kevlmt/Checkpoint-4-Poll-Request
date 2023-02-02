/* eslint-disable import/no-unresolved */
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import Header from "@components/Header";
import AsideAdmin from "./Components/AsideAdmin";
import ContentAdmin from "./Components/ContentAdmin";
import "./Admin.scss";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Admin() {
  const query = useQuery();

  return (
    <div className="admin-page">
      <Header />
      <div className="admin-container">
        <AsideAdmin query={query} />
        <ContentAdmin query={query} />
      </div>
    </div>
  );
}
