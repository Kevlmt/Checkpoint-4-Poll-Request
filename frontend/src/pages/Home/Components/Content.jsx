/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useContext, useEffect, useState } from "react";
import axios from "@services/axios";
import UserContext from "../../../contexts/UserContext";
import PollsCard from "./PollsCard";
import "./Content.scss";
import CommentPage from "./CommentPage";

export default function Content({
  polls,
  query,
  currentCategory,
  fetchPolls,
  selectedCategory,
  pollId,
  comments,
  fetchComments,
}) {
  const { user } = useContext(UserContext);

  const [commentText, setCommentText] = useState("");
  const postComment = async (e) => {
    e.preventDefault();
    const comment = {
      text: commentText,
    };
    try {
      const newComment = await axios
        .post(`comments/${pollId}`, comment, {
          withCredentials: true,
        })
        .then((response) => response.data);
      if (newComment) {
        setCommentText("");
        return fetchComments();
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const [followedList, setFollowedList] = useState([]);
  const fetchFollowedList = async () => {
    try {
      const list = await axios
        .get("/users/followed", {
          withCredentials: true,
        })
        .then((response) => {
          const data = response.data.map((e) => e.authorId);
          return data;
        });
      if (list) {
        return setFollowedList(list);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleContent = () => {
    switch (currentCategory) {
      case "Voted":
        return (
          polls &&
          polls
            .filter((poll) => {
              return (
                (poll.usersAgree.includes(user.id) ||
                  poll.usersDisagree.includes(user.id)) &&
                poll.author !== user.pseudo
              );
            })
            .sort((a, b) => {
              return b.date.originalDate.localeCompare(a.date.originalDate);
            })
            .map((poll, index) => (
              <li
                key={poll.id}
                className={
                  index === polls.length - 1
                    ? "polls-li-container last-poll"
                    : "polls-li-container"
                }
              >
                <PollsCard
                  poll={poll}
                  query={query}
                  currentCategory={currentCategory}
                  fetchPolls={fetchPolls}
                  fetchFollowedList={fetchFollowedList}
                  followedList={followedList}
                />
              </li>
            ))
        );
      case "Discover":
        return (
          polls &&
          polls
            .filter((poll) => {
              return (
                !poll.usersAgree.includes(user.id) &&
                !poll.usersDisagree.includes(user.id) &&
                poll.author !== user.pseudo
              );
            })
            .sort((a, b) => {
              return b.date.originalDate.localeCompare(a.date.originalDate);
            })
            .map((poll, index) => (
              <li
                key={poll.id}
                className={
                  index === polls.length - 1
                    ? "polls-li-container last-poll"
                    : "polls-li-container"
                }
              >
                <PollsCard
                  poll={poll}
                  query={query}
                  currentCategory={currentCategory}
                  fetchPolls={fetchPolls}
                  fetchFollowedList={fetchFollowedList}
                  followedList={followedList}
                />
              </li>
            ))
        );
      case "MyPolls":
        return (
          polls &&
          polls
            .filter((poll) => {
              return poll.author === user.pseudo;
            })
            .sort((a, b) => {
              return b.date.originalDate.localeCompare(a.date.originalDate);
            })
            .map((poll, index) => (
              <li
                key={poll.id}
                className={
                  index === polls.length - 1
                    ? "polls-li-container last-poll"
                    : "polls-li-container"
                }
              >
                <PollsCard
                  poll={poll}
                  query={query}
                  currentCategory={currentCategory}
                  fetchPolls={fetchPolls}
                  fetchFollowedList={fetchFollowedList}
                  followedList={followedList}
                />
              </li>
            ))
        );
      case "Recent":
        return (
          polls &&
          polls
            .sort((a, b) => {
              return b.date.originalDate.localeCompare(a.date.originalDate);
            })
            .map((poll, index) => (
              <li
                key={poll.id}
                className={
                  index === polls.length - 1
                    ? "polls-li-container last-poll"
                    : "polls-li-container"
                }
              >
                <PollsCard
                  poll={poll}
                  query={query}
                  currentCategory={currentCategory}
                  fetchPolls={fetchPolls}
                  fetchFollowedList={fetchFollowedList}
                  followedList={followedList}
                />
              </li>
            ))
        );
      case "Category":
        return (
          polls &&
          polls
            .filter((poll) => {
              return poll.categoryName === selectedCategory;
            })
            .sort((a, b) => {
              return b.date.originalDate.localeCompare(a.date.originalDate);
            })
            .map((poll, index) => (
              <li
                key={poll.id}
                className={
                  index === polls.length - 1
                    ? "polls-li-container last-poll"
                    : "polls-li-container"
                }
              >
                <PollsCard
                  poll={poll}
                  query={query}
                  currentCategory={currentCategory}
                  fetchPolls={fetchPolls}
                  fetchFollowedList={fetchFollowedList}
                  followedList={followedList}
                />
              </li>
            ))
        );
      default:
        return (
          polls &&
          polls
            .sort((a, b) => {
              return b.date.originalDate.localeCompare(a.date.originalDate);
            })
            .map((poll, index) => (
              <li
                key={poll.id}
                className={
                  index === polls.length - 1
                    ? "polls-li-container last-poll"
                    : "polls-li-container"
                }
              >
                <PollsCard
                  poll={poll}
                  query={query}
                  currentCategory={currentCategory}
                  fetchPolls={fetchPolls}
                  fetchFollowedList={fetchFollowedList}
                  followedList={followedList}
                />
              </li>
            ))
        );
    }
  };
  useEffect(() => {
    fetchPolls();
    fetchFollowedList();
  }, []);

  return (
    <div
      className={
        query.get("poll") !== null
          ? "content-container pollOpened"
          : "content-container"
      }
    >
      {query.get("poll") !== null ? (
        <CommentPage
          pollId={query.get("poll")}
          comments={comments}
          fetchComments={fetchComments}
          fetchFollowedList={fetchFollowedList}
          followedList={followedList}
        />
      ) : (
        <section className="polls-list-container">
          <ul className="polls-ul-container">{polls && handleContent()}</ul>
        </section>
      )}
      {query.get("poll") !== null ? (
        <div className="comment-page-input-container">
          <div>
            <textarea
              type="text"
              placeholder="Leave a comment.."
              required
              cols="40"
              rows="3"
              autoComplete="on"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="button" onClick={postComment}>
              Comment
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
