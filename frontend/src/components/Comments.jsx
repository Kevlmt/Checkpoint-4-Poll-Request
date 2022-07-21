/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import { useEffect, useState } from "react";
import axios from "@services/axios";
import formatDate from "@services/dateFormat";

export default function Comments({ pollsId }) {
  const [comments, setComments] = useState(null);

  const fetchComments = async () => {
    try {
      const commentsList = await axios
        .get(`/comments/${pollsId}`)
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
        setComments(commentsList);
      }
      return null;
    } catch (err) {
      return alert(err.reponse.data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [pollsId]);

  return (
    <section className="comment-list-container">
      {comments && comments.map((comment) => <h1>{comment.text}</h1>)}
    </section>
  );
}
