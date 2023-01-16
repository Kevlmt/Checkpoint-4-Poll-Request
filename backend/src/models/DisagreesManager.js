const AbstractManager = require("./AbstractManager");

class DisagreesManager extends AbstractManager {
  static table = "disagrees";

  browseUsersDisagreeId(pollsId) {
    return this.connection
      .query(`SELECT userId FROM disagree WHERE pollId = ?`, pollsId)
      .then((result) => result[0]);
  }

  checkAlreadyDisagreed(userId, pollsId) {
    return this.connection.query(
      `SELECT * FROM disagrees WHERE userId = ? AND pollId = ?`,
      [userId, pollsId]
    );
  }

  disagree(userId, pollId) {
    return this.connection.query(
      `INSERT INTO disagrees (userId, pollId) VALUES (?, ?)`,
      [userId, pollId]
    );
  }
}

module.exports = DisagreesManager;
