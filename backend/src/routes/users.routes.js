const express = require("express");

const {
  UsersController,
  FilesController,
  AuthController,
} = require("../controllers");

const router = express.Router();

router.post("/", FilesController.uploadUser, UsersController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.get("/:id", AuthController.isUserConnected, UsersController.read);
router.put(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAllowedToModify,
  FilesController.uploadUser,
  UsersController.edit
);

module.exports = router;
