/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PollsManager extends AbstractManager {
  static table = "polls";

  browseAll() {
    return this.connection.query(
      `SELECT p.id, p.text, p.date, p.categoryId, p.userId authorId, c.name categoryName, u.pseudo author, u.imgLInk authorImgLink, a.userId userAgree, d.userId userDisagree FROM ${PollsManager.table} p LEFT JOIN users u ON u.id = p.userId LEFT JOIN agrees a ON p.id = a.pollId LEFT JOIN disagrees d ON p.id = d.pollId LEFT JOIN categories c ON p.categoryId = c.id ORDER BY p.ID`
    );
  }

  // browseByCategories(categoriesId) {
  //   return this.connection.query(
  //     `SELECT p.id, p.text, p.date, p.categoryId, c.name category_name, u.pseudo author, u.imgLInk authorImgLink, a.userId userAgree, d.userId userDisagree FROM ${PollsManager.table} p LEFT JOIN users u ON u.id = p.userId LEFT JOIN agree a ON p.id = a.pollId LEFT JOIN disagree d ON p.id = d.pollId LEFT JOIN categories c ON p.categoryId = c.id ORDER BY p.ID WHERE p.categoryId = ?`,
  //     [categoriesId]
  //   );
  // }

  browseByUser(userId) {
    return this.connection.query(
      `SELECT p.id, p.text, p.date, p.categoryId, p.userId authorId, c.name categoryName, u.pseudo author, u.imgLInk authorImgLink FROM ${PollsManager.table} p LEFT JOIN users u ON u.id = p.userId LEFT JOIN categories c ON p.categoryId = c.id WHERE p.userId = ? ORDER BY p.ID`,
      userId
    );
  }

  update(poll, pollId) {
    return this.connection.query(
      `UPDATE ${PollsManager.table} SET ? WHERE id = ?`,
      [poll, pollId]
    );
  }

  browseById(pollId) {
    return this.connection.query(
      `SELECT p.id, p.text, p.date, p.categoryId, p.userId authorId, c.name categoryName, u.pseudo author, u.imgLInk authorImgLink FROM ${PollsManager.table} p LEFT JOIN users u ON u.id = p.userId LEFT JOIN categories c ON p.categoryId = c.id WHERE p.id = ?`,
      pollId
    );
  }

  create(polls) {
    return this.connection.query(`INSERT INTO ${PollsManager.table} SET ?`, [
      polls,
    ]);
  }

  delete(pollId) {
    return this.connection.query(
      `DELETE FROM ${PollsManager.table} WHERE id = ?`,
      pollId
    );
  }
}

module.exports = PollsManager;
