const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  static table = "comments";

  insert(comment) {
    return this.connection.query(`INSERT INTO ${CommentsManager.table} SET ?`, [
      comment,
    ]);
  }

  findById(commentId) {
    return this.connection.query(
      `SELECT * FROM ${CommentsManager.table} WHERE id = ?`,
      commentId
    );
  }

  findByPolls(pollsId) {
    return this.connection
      .query(
        `SELECT c.id, c.text, c.date, c.pollId, c.userId authorId, u.pseudo, u.imgLink authorImgLink FROM ${CommentsManager.table} c LEFT JOIN users u ON u.id = c.userId WHERE pollId = ?`,
        [pollsId]
      )
      .then((result) => result[0]);
  }

  findCommentLength(pollId) {
    return this.connection.query(
      `SELECT COUNT(*) as commentLength FROM ${CommentsManager.table} WHERE pollId = ?`,
      pollId
    );
  }

  editComment(comment, commentId) {
    return this.connection.query(
      `UPDATE ${CommentsManager.table} SET ? WHERE id = ?`,
      [comment, commentId]
    );
  }

  deleteComment(commentId) {
    return this.connection.query(
      `DELETE FROM ${CommentsManager.table} WHERE id = ?`,
      commentId
    );
  }
}

module.exports = CommentsManager;
