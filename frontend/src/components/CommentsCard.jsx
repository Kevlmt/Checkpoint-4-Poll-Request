/* eslint-disable react/prop-types */
export default function CommentsCard({ comment, index }) {
  // const handleClassName = () => {
  //   if ()
  // }
  return (
    // <div
    //   className={
    //     index % 2 === 0
    //       ? "comment-card-container-right"
    //       : "comment-card-container-left"
    //   }
    // >
    //   <div className={index % 2 === 0 ? "comment-dark" : "comment-light"}>
    //     <p className="comment-text">{comment.text}</p>
    //   </div>
    //   <div className="comment-info-div">
    //     <p className="comment-date">
    //       {comment.date.fullDMY} at {comment.date.hour}
    //     </p>{" "}
    //     <p className="comment-author">{comment.pseudo}</p>
    //   </div>
    // </div>
    <div
      className={
        index % 2 === 0
          ? "comment-card-container-right"
          : "comment-card-container-left"
      }
    >
      <div className={index % 2 === 0 ? "comment-dark" : "comment-light"}>
        <p className="comment-text">{comment.text}</p>
      </div>
      <div className="comment-info-div">
        <p className="comment-date">
          {comment.date.fullDMY} at {comment.date.hour}
        </p>{" "}
        <p className="comment-author">{comment.pseudo}</p>
      </div>
    </div>
  );
}
