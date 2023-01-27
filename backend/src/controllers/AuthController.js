const jwt = require("jsonwebtoken");
const models = require("../models");

class AuthController {
  static login = async (req, res) => {
    const { email, password, remember } = req.body;
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
            remember,
            expiresIn: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
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
          .json({
            ...user[0],
            remember,
            expiresIn: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          });
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

  static isUserAdmin = (req, res, next) => {
    if (req.userRole === "ADMIN") {
      return next();
    }
    return res.status(403).send("You are not an admin");
  };

  static isUserAllowedToModify = (req, res, next) => {
    if (parseInt(req.params.id, 10) === req.userId || req.role === "ADMIN") {
      return next();
    }
    return res
      .status(403)
      .send("You do not have the right to modify other accounts than yours !");
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
      req.userRole = decoded.role;
      return next();
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static refreshToken = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(204);
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      const { id, remember } = decoded;

      const user = await models.users.findById(id);
      if (!user[0]) {
        return res.status(404).send(`User with id "${id}" not found`);
      }
      if (remember) {
        const refreshedToken = jwt.sign(
          {
            id: user[0].id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email: user[0].email,
            pseudo: user[0].pseudo,
            role: user[0].role,
            remember,
            expiresIn: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          },
          process.env.ACCESS_JWT_SECRET,
          { expiresIn: process.env.ACCESS_JWT_EXPIRESIN }
        );
        return res
          .cookie("accessToken", refreshedToken, {
            httpOnly: true,
            secure: process.env.ACCESS_JWT_SECURE === "true",
            maxAge: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json({
            ...user[0],
            remember,
            expiresIn: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          });
      }
      return res.sendStatus(204);
    } catch (err) {
      return res.sendStatus(500);
    }
  };
}

module.exports = AuthController;
