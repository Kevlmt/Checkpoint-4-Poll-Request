const models = require("../models");

class UsersController {
  static register = async (req, res) => {
    const token = req.cookies.accessToken;
    if (token) {
      return res
        .status(403)
        .send("Disconnect from your account before creating a new one");
    }
    const user = req.body;
    const hashedPassword = await models.users.hashPassword(user.password);
    try {
      const emailExist = await models.users.emailAlreadyExist(user.email);
      if (emailExist) return res.status(400).send("email already exist");
      const newAccount = models.users.insert({
        ...user,
        password: hashedPassword,
      });
      return res.status(201).send({ ...user, id: newAccount.insertId });
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static read = async (req, res) => {
    try {
      const user = await models.users
        .find(parseInt(req.params.id, 10), req.userId)
        .then((userInfo) => userInfo[0][0]);

      if (!user) {
        res.status(404).send(`User ${req.params.id} not found`);
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static readAll = async (req, res) => {
    try {
      const [userList] = await models.users.findAll();
      if (!userList) return res.status(404).send("Users not found");
      return res.status(200).send(userList);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static readAllAdmin = async (req, res) => {
    try {
      const [userList] = await models.users.findAllAdmin();
      if (!userList) return res.status(404).send("Users not found");
      return res.status(200).send(userList);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static edit = async (req, res) => {
    const user = req.body;
    user.id = parseInt(req.params.id, 10);
    try {
      const userModified = await models.users.update(user);
      if (userModified.affectedRows === 0) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static follow = async (req, res) => {
    const followerId = req.userId;
    const followedId = parseInt(req.params.id, 10);
    try {
      const [checkAlreadyFollow] = await models.follows.checkAlreadyFollow(
        followerId,
        followedId
      );
      if (checkAlreadyFollow.length) {
        return res.status(409).send("User already followed.");
      }
      const follow = await models.follows.follow({
        followerId,
        followedId,
      });
      if (!follow) {
        return res.status(404).send("Error in following");
      }
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static searchFollowed = async (req, res) => {
    const { userId } = req;
    try {
      const [followedList] = await models.follows.findFollowed(userId);
      return res.status(200).send(followedList);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try {
      const userToDelete = await models.users.findById(userId);
      if (!userToDelete) {
        return res.status(404).send("user to delete no found");
      }
      if (userToDelete.role === "ADMIN") {
        return res.status(403).send("You cant delete admin account");
      }
      await models.users.delete(userId);
      return res.status(200).send("user deleted");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = UsersController;
