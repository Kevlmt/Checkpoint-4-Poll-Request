const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  static table = "categories";

  findAll() {
    return this.connection.query(`SELECT * FROM ${CategoriesManager.table}`);
  }

  createOne(category) {
    return this.connection.query(
      `INSERT INTO ${CategoriesManager.table} SET ?`,
      category
    );
  }
}

module.exports = CategoriesManager;
