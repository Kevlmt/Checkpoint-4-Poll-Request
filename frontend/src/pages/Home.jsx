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
  const [comments, setComments] = useState(null);
  const [polls, setPolls] = useState();
  const [searchValue, setSearchValue] = useState("");

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
        return setPolls(dataFetched);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsList = await axios
        .get(`/comments/${query.get("poll")}`)
        .then((result) => {
          const fetchedData = result.data;
          fetchedData.forEach((comment) => {
            const date = formatDate(comment.date);
            // eslint-disable-next-line no-param-reassign
            comment.date = date;
            return comment;
          });
          return fetchedData;
        });
      if (commentsList) {
        return setComments(commentsList);
      }
      return null;
    } catch (err) {
      return alert(err.reponse.data);
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
          pollsId={query.get("poll")}
          fetchComments={fetchComments}
          comment={comments}
        />
      )}
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        {" "}
        <Aside
          categories={categories}
          query={query}
          currentCategory={query.get("category")}
          pollsId={query.get("poll")}
        />
        <Content
          polls={polls}
          query={query}
          currentCategory={query.get("category")}
          fetchPolls={fetchPolls}
          fetchComments={fetchComments}
          comments={comments}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
}
