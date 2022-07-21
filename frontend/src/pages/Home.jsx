/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Header from "@components/Header";
import Aside from "@components/Aside";
import Popup from "@components/Popup";
import Content from "@components/Content";
import formatDate from "@services/dateFormat";
import axios from "../services/axios";
import "@styles/Home.scss";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home() {
  const [categories, setCategories] = useState();
  const [polls, setPolls] = useState();
  const query = useQuery();

  const fetchCategories = async () => {
    try {
      const data = await axios.get("/categories").then((result) => result.data);
      if (data) {
        setCategories(data);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const fetchPolls = async () => {
    try {
      const dataFetched = await axios.get("/polls").then((result) => {
        const newPolls = result.data;
        newPolls.forEach((poll) => {
          const date = formatDate(poll.date);
          // eslint-disable-next-line no-param-reassign
          poll.date = date;
          return poll;
        });
        return newPolls;
      });
      if (dataFetched) {
        setPolls(dataFetched);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPolls();
  }, []);

  return (
    <div className="page">
      {query.get("popup") && (
        <Popup
          popup={query.get("popup")}
          currentCategory={query.get("category")}
          query={query}
          categories={categories}
          fetchPolls={fetchPolls}
        />
      )}
      <Header />
      <div className="content">
        {" "}
        <Aside
          categories={categories}
          query={query}
          currentCategory={query.get("category")}
        />
        <Content
          polls={polls}
          query={query}
          currentCategory={query.get("category")}
          fetchPolls={fetchPolls}
        />
      </div>
    </div>
  );
}
