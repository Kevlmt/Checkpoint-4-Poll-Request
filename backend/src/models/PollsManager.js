/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PollsManager extends AbstractManager {
  static table = "polls";

  browseAll() {
    return this.connection.query(
      `SELECT p.id, p.text, p.date, p.categories_id category_id, c.name category_name, u.pseudo author, u.imgLInk author_imgLink, a.users_id userAgree, d.users_id userDisagree FROM ${PollsManager.table} p LEFT JOIN users u ON u.id = p.users_id LEFT JOIN agree a ON p.id = a.polls_id LEFT JOIN disagree d ON p.id = d.polls_id LEFT JOIN categories c ON p.categories_id = c.id ORDER BY p.ID`
    );
  }

  // browseByCategories(categoriesId) {
  //   return this.connection.query(
  //     `SELECT p.id, p.text, p.date, p.categories_id category_id, c.name category_name, u.pseudo author, u.imgLInk author_imgLink, a.users_id userAgree, d.users_id userDisagree FROM ${PollsManager.table} p LEFT JOIN users u ON u.id = p.users_id LEFT JOIN agree a ON p.id = a.polls_id LEFT JOIN disagree d ON p.id = d.polls_id LEFT JOIN categories c ON p.categories_id = c.id ORDER BY p.ID WHERE p.categories_id = ?`,
  //     [categoriesId]
  //   );
  // }

  browseById(pollsId) {
    return this.connection.query(
      `SELECT p.id, p.text, p.date, p.categories_id category_id, c.name category_name, u.pseudo author, u.imgLInk author_imgLink FROM ${PollsManager.table} p LEFT JOIN users u ON u.id = p.users_id LEFT JOIN categories c ON p.categories_id = c.id`,
      [pollsId]
    );
  }

  browseUsersAgreeId(pollsId) {
    return this.connection
      .query(`SELECT users_id FROM agree WHERE polls_id = ?`, pollsId)
      .then((result) => result[0]);
  }

  browseUsersDisagreeId(pollsId) {
    return this.connection
      .query(`SELECT users_id FROM disagree WHERE polls_id = ?`, pollsId)
      .then((result) => result[0]);
  }

  checkAlreadyAgreed(userId, pollsId) {
    return this.connection.query(
      `SELECT * FROM agree WHERE users_id = ? AND polls_id = ?`,
      [userId, pollsId]
    );
  }

  checkAlreadyDisagreed(userId, pollsId) {
    return this.connection.query(
      `SELECT * FROM diagree WHERE users_id = ? AND polls_id = ?`,
      [userId, pollsId]
    );
  }

  create(polls) {
    return this.connection.query(`INSERT INTO ${PollsManager.table} SET ?`, [
      polls,
    ]);
  }
}

module.exports = PollsManager;
