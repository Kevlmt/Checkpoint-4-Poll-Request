/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Header from "@components/Header";
import AsideHome from "@pages/Home/Components/AsideHome";
import Popup from "@pages/Home/Components/Popup";
import Content from "@pages/Home/Components/Content";
import formatDate from "@services/dateFormat";
import axios from "../../services/axios";
import "./Home.scss";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home() {
  const [categories, setCategories] = useState();
  const [polls, setPolls] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const query = useQuery();

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

  const fetchPolls = async () => {
    try {
      const dataFetched = await axios
        .get("/polls", { withCredentials: true })
        .then(async (result) => {
          const newPolls = result.data;
          await newPolls.forEach(async (poll) => {
            const date = formatDate(poll.date);
            // eslint-disable-next-line no-param-reassign
            poll.date = date;
            // eslint-disable-next-line no-param-reassign
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

  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    try {
      const commentsList = await axios
        .get(`/comments/${query.get("poll")}`, { withCredentials: true })
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
    <div className="home-page">
      {query.get("popup") === "createPoll" && (
        <Popup
          popup={query.get("popup")}
          currentCategory={query.get("category")}
          query={query}
          categories={categories}
          fetchPolls={fetchPolls}
          pollId={query.get("poll")}
          setIsOpen={setIsOpen}
        />
      )}
      <Header
        fetchPolls={fetchPolls}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentCategory={query.get("category")}
        poll={query.get("poll")}
      />
      <div className="home-content">
        <AsideHome
          categories={categories}
          query={query}
          currentCategory={query.get("category")}
          pollsId={query.get("poll")}
          setSelectedCategory={setSelectedCategory}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCategory={selectedCategory}
        />
        <Content
          polls={polls}
          query={query}
          currentCategory={query.get("category")}
          fetchPolls={fetchPolls}
          selectedCategory={selectedCategory}
          pollId={query.get("poll")}
          comments={comments}
          fetchComments={fetchComments}
        />
      </div>
    </div>
  );
}
