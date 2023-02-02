const AbstractManager = require("./AbstractManager");

class MessagesManager extends AbstractManager {
  static table = "messages";

  create(message) {
    return this.connection.query(
      `INSERT INTO ${MessagesManager.table} SET ?`,
      message
    );
  }

  readSent(fromId, toId) {
    return this.connection.query(
      `SELECT m.fromId, m.toId, m.text, m.date, u.pseudo, u.imgLink FROM ${MessagesManager.table} m LEFT JOIN users u ON u.id = m.fromId WHERE m.fromId = ? AND m.toId = ?`,
      [fromId, toId]
    );
  }

  readReceived(toId, fromId) {
    return this.connection.query(
      `SELECT m.fromId, m.toId, m.text, m.date, u.pseudo, u.imgLink FROM ${MessagesManager.table} m LEFT JOIN users u ON u.id = m.fromId WHERE m.fromId = ? AND m.toId = ?`,
      [fromId, toId]
    );
  }
}

module.exports = MessagesManager;
