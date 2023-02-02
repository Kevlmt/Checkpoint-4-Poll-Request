const express = require("express");

const {
  UsersController,
  FilesController,
  AuthController,
} = require("../controllers");

const router = express.Router();

router.post("/", FilesController.uploadUser, UsersController.register);
router.post("/login", AuthController.login);
router.get(
  "/follow/:id",
  AuthController.isUserConnected,
  UsersController.follow
);
router.get(
  "/followed",
  AuthController.isUserConnected,
  UsersController.searchFollowed
);
router.get("/logout", AuthController.logout);
router.get("/refreshToken", AuthController.refreshToken);
router.get(
  "/admin",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  UsersController.readAllAdmin
);
router.get("/:id", AuthController.isUserConnected, UsersController.read);
router.get("/", AuthController.isUserConnected, UsersController.readAll);
router.put(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAllowedToModify,
  FilesController.uploadUser,
  UsersController.edit
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  UsersController.delete
);

module.exports = router;
