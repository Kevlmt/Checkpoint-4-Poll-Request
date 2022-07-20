const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  static table = "categories";

  findAll() {
    return this.connection.query(`SELECT * FROM ${CategoriesManager.table}`);
  }
}

module.exports = CategoriesManager;
