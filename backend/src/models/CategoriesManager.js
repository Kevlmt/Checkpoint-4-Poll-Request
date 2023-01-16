const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  static table = "categories";

  findAll() {
    return this.connection.query(`SELECT * FROM ${CategoriesManager.table}`);
  }

  create(category) {
    return this.connection.query(
      `INSERT INTO ${CategoriesManager.table} SET ?`,
      category
    );
  }

  edit(category, categoryId) {
    return this.connection.query(
      `UPDATE ${CategoriesManager.table} SET ? WHERE id = ?`,
      [category, categoryId]
    );
  }

  delete(categoryId) {
    return this.connection.query(
      `DELETE FROM ${CategoriesManager.table} WHERE id = ?`,
      categoryId
    );
  }
}

module.exports = CategoriesManager;
