class AbstractManager {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }
}

module.exports = AbstractManager;
