const jwt = require("jsonwebtoken");
const models = require("../models");

class UsersController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send("You must provide an email and a password");
    }
    try {
      const user = await models.users.findByEmail(email);
      if (!user[0]) {
        return res.status(404).send(`User with email "${email}" not found`);
      }

      //  Checks password and create accessToken
      if (await models.users.passwordCheck(email, password)) {
        const token = jwt.sign(
          {
            id: user[0].id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email: user[0].email,
            pseudo: user[0].pseudo,
            role: user[0].role,
          },
          process.env.ACCESS_JWT_SECRET,
          { expiresIn: process.env.ACCESS_JWT_EXPIRESIN }
        );
        return res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.ACCESS_JWT_SECURE === "true",
            maxAge: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json(user[0]);
      }
      return res.status(403).send("Invalid creditentials");
    } catch (err) {
      res.sendStatus(500);
    }
    return null;
  };

  static logout = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(418).send("You are not logged in, teapot");
    }
    return res.clearCookie("accessToken").status(200).send("Disconnected.");
  };

  static isUserConnected = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).send("You are not logged in");
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      req.userId = decoded.id;
      req.userFirstname = decoded.firstname;
      req.userLastname = decoded.lastname;
      req.userPseudo = decoded.pseudo;
      return next();
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static isUserAllowedToGet = (req, res, next) => {
    if (parseInt(req.params.id, 10) === req.userId) {
      return next();
    }
    return res
      .status(403)
      .send("You do not have the right to read other accounts than yours!");
  };

  static isUserAllowedToModify = (req, res, next) => {
    if (parseInt(req.params.id, 10) === req.userId) {
      return next();
    }
    return res
      .status(403)
      .send("You do not have the right to modify other accounts than yours !");
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

  static edit = (req, res) => {
    const user = req.body;
    user.id = parseInt(req.params.id, 10);

    models.users
      .update(user)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
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
