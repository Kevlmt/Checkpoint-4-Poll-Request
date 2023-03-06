/* eslint-disable import/no-unresolved */
import Header from "@components/Header";
import { useState, useContext, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "@services/axios";
import UserContext from "../../contexts/UserContext";
import AsideChat from "./Components/AsideChat";
import ContentChat from "./Components/ContentChat";
import "./Chat.scss";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
//yoh//
export default function Chat() {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const [usersList, setUsersList] = useState(undefined);
  const fetchUsersList = async () => {
    try {
      const fetchedData = await axios
        .get("/users", { withCredentials: true })
        .then((response) => response.data);
      if (fetchedData) {
        return setUsersList(fetchedData);
      }
      return null;
    } catch (err) {
      return alert(err.reponse.data);
    }
  };
  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <div className="chat-page">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="chat-page-content">
        <AsideChat
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userId={user.id}
          query={useQuery()}
          usersList={usersList}
        />
        <ContentChat query={useQuery()} userId={user.id} />
      </div>
    </div>
  );
}
