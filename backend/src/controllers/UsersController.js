const models = require("../models");

class UsersController {
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

  // static delete = (req, res) => {
  //   models.users
  //     .delete(req.params.id)
  //     .then(() => {
  //       res.sendStatus(204);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  // static fetchVote = async (req, res) => {
  //   const { userId } = req;
  //   try {
  //     const [votedIdea] = await models.users.fetchLike(userId);
  //     return res.status(200).send(votedIdea);
  //   } catch (err) {
  //     return res.sendStatus(500);
  //   }
  // };

  // static fetchFollow = async (req, res) => {
  //   const { userId } = req;
  //   try {
  //     const [followedProject] = await models.users.fetchFollow(userId);
  //     return res.status(200).send(followedProject);
  //   } catch (err) {
  //     return res.sendStatus(500);
  //   }
  // };
}

module.exports = UsersController;
