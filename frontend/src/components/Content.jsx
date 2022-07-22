/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import PollsCard from "./PollsCard";
import Comments from "./Comments";
import "@styles/Content.scss";

export default function Content({
  polls,
  query,
  currentCategory,
  fetchPolls,
  fetchComments,
  comments,
  searchValue,
}) {
  const { user } = useContext(UserContext);

  const handleContent = () => {
    switch (currentCategory) {
      case "Random":
        return polls
          .filter((poll) => {
            return poll.category_name === "Random";
          })
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
      case "Animals":
        return polls
          .filter((poll) => {
            return poll.category_name === "Animals";
          })
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
      case "Politics":
        return polls
          .filter((poll) => {
            return poll.category_name === "Politics";
          })
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
      case "Advices":
        return polls
          .filter((poll) => {
            return poll.category_name === "Advices";
          })
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
      case "Voted":
        return polls
          .filter((poll) => {
            return (
              (poll.usersAgree.includes(user.id) ||
                poll.usersDisagree.includes(user.id)) &&
              poll.author !== user.pseudo
            );
          })
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
      case "Discover":
        return polls
          .filter((poll) => {
            return (
              !poll.usersAgree.includes(user.id) &&
              !poll.usersDisagree.includes(user.id) &&
              poll.author !== user.pseudo
            );
          })
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
      case "MyPolls":
        return polls
          .filter((poll) => {
            return poll.author === user.pseudo;
          })
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
      case "Popular":
        return polls
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
      case "Recent":
        return polls
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));

      default:
        return polls
          .filter((poll) => {
            return (
              poll.text.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              poll.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .sort((a, b) => {
            return b.date.originalDate.localeCompare(a.date.originalDate);
          })
          .map((poll) => (
            <li key={poll.id} className="polls-li-container">
              <PollsCard
                poll={poll}
                query={query}
                currentCategory={currentCategory}
                fetchPolls={fetchPolls}
              />
            </li>
          ));
    }
  };
  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className="content-container">
      <section className="polls-list-container">
        <ul className="polls-ul-container">{polls && handleContent()}</ul>
      </section>
      {query.get("poll") !== null ? (
        <Comments
          pollsId={query.get("poll")}
          currentCategory={currentCategory}
          fetchComments={fetchComments}
          comments={comments}
        />
      ) : null}
    </div>
  );
}
