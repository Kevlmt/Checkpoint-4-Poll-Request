const AbstractManager = require("./AbstractManager");

class FollowsManager extends AbstractManager {
  static table = "follows";

  follow(followInfo) {
    return this.connection.query(
      `INSERT INTO ${FollowsManager.table} SET ?`,
      followInfo
    );
  }

  checkAlreadyFollow(followerId, followedId) {
    return this.connection.query(
      `SELECT * FROM ${FollowsManager.table} WHERE followerId = ? AND followedId = ?`,
      [followerId, followedId]
    );
  }

  findFollowed(userId) {
    return this.connection.query(
      `SELECT followedId as authorId FROM ${FollowsManager.table} WHERE followerId = ?`,
      userId
    );
  }
}
module.exports = FollowsManager;
