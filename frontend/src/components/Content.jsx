/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { useEffect } from "react";
import PollsCard from "./PollsCard";
import Comments from "./Comments";
import "@styles/Content.scss";

export default function Content({ polls, query, currentCategory, fetchPolls }) {
  useEffect(() => {}, [fetchPolls()]);
  return (
    <div className="content-container">
      <section className="polls-list-container">
        <ul className="polls-ul-container">
          {polls &&
            polls.map((poll) => (
              <li key={poll.id} className="polls-li-container">
                <PollsCard
                  poll={poll}
                  query={query}
                  currentCategory={currentCategory}
                  fetchPolls={fetchPolls}
                />
              </li>
            ))}
        </ul>
      </section>
      {query.get("poll") && <Comments pollsId={query.get("poll")} />}
    </div>
  );
}
