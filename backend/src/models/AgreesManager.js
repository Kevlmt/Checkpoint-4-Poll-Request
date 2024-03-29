const AbstractManager = require("./AbstractManager");

class AgreesManager extends AbstractManager {
  static table = "agrees";

  browseUsersAgreeId(pollsId) {
    return this.connection
      .query(`SELECT userId FROM agrees WHERE pollId = ?`, pollsId)
      .then((result) => result[0]);
  }

  checkAlreadyAgreed(userId, pollsId) {
    return this.connection.query(
      `SELECT * FROM agrees WHERE userId = ? AND pollId = ?`,
      [userId, pollsId]
    );
  }

  // findAgreesCount(pollId) {
  //   return this.connection.query(
  //     `SELECT COUNT(*) as agreesLength FROM ${AgreesManager.table} WHERE pollId = ?`,
  //     pollId
  //   );
  // }

  agree(userId, pollId) {
    return this.connection.query(
      `INSERT INTO agrees (userId, pollId) VALUES (?, ?)`,
      [userId, pollId]
    );
  }
}

module.exports = AgreesManager;
