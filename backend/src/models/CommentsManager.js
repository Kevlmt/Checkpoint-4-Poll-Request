const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  static table = "comments";

  insert(comment) {
    return this.connection.query(`INSERT INTO ${CommentsManager.table} SET ?`, [
      comment,
    ]);
  }

  findByPolls(pollsId) {
    return this.connection
      .query(
        `SELECT c.id, c.text, c.date, c.polls_id, c.users_id author_id, u.pseudo, u.imgLink author_imgLink FROM ${CommentsManager.table} c LEFT JOIN users u ON u.id = c.users_id WHERE polls_id = ?`,
        [pollsId]
      )
      .then((result) => result[0]);
  }
}

module.exports = CommentsManager;
