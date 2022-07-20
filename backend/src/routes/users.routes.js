const express = require("express");

const { UsersController, FilesController } = require("../controllers");

const router = express.Router();

router.post("/", FilesController.uploadUser, UsersController.register);
router.post("/login", UsersController.login);
router.get("/logout", UsersController.logout);
router.get(
  "/:id",
  UsersController.isUserConnected,
  UsersController.isUserAllowedToGet,
  UsersController.read
);
router.put(
  "/:id",
  UsersController.isUserConnected,
  UsersController.isUserAllowedToModify,
  FilesController.uploadUser,
  UsersController.edit
);

module.exports = router;
