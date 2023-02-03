/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import axios from "@services/axios";
import UserContext from "../../../contexts/UserContext";
import "./ContentChat.scss";

export default function ContentChat({ query, userId }) {
  const userQuery = query.get("user");
  const { socket } = useContext(UserContext);
  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const fetchMessages = async (id = query.get("user")) => {
    const data = await axios
      .get(`/messages/${id}`, {
        withCredentials: true,
      })
      .then((response) => response.data);
    return setMessages(data);
  };

  const handleSend = async () => {
    const message = {
      text: newMessage,
      toId: parseInt(userQuery, 10),
    };
    await axios.post("/messages", message, { withCredentials: true });

    socket.emit("send-msg", {
      fromId: userId,
      toId: parseInt(userQuery, 10),
    });

    setNewMessage("");
    return fetchMessages();
  };

  useEffect(() => {
    if (socket)
      socket.on("msg-recieve", (fromId) => {
        if (fromId === parseInt(userQuery, 10)) {
          return fetchMessages(fromId);
        }
        return null;
      });

    return () => {
      socket.off("msg-recieve");
    };
  }, [socket, userQuery]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (userQuery) fetchMessages();
  }, [userQuery]);

  return (
    <div className="chat-content">
      {query.get("user") ? (
        <div className="chat-messages-container">
          {messages &&
            messages
              .sort((a, b) => {
                return a.date.localeCompare(b.date);
              })
              .map((message, index) => (
                <div
                  className={
                    message.fromId === userId ? "senders" : "receivers"
                  }
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  ref={scrollRef}
                >
                  <p>{message.text}</p>
                </div>
              ))}
        </div>
      ) : (
        <p>No messages</p>
      )}
      <div className="chat-input-container">
        <div>
          <input
            placeholder="type your message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="button" onClick={handleSend}>
            send
          </button>
        </div>
      </div>
    </div>
  );
}
