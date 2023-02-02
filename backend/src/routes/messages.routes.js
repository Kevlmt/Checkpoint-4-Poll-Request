const express = require("express");

const { MessagesController, AuthController } = require("../controllers");

const router = express.Router();
router.get("/", AuthController.isUserConnected, MessagesController.test);
router.get(
  "/:id",
  AuthController.isUserConnected,
  MessagesController.readMessages
);
router.post(
  "/",
  AuthController.isUserConnected,
  MessagesController.sendMessage
);

module.exports = router;
