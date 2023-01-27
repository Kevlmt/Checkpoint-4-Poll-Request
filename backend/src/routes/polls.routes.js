const express = require("express");

const { PollsController, AuthController } = require("../controllers");

const router = express.Router();

router.get("/", AuthController.isUserConnected, PollsController.findAll);
router.get("/:id", AuthController.isUserConnected, PollsController.readById);
router.get(
  "/users/:id",
  AuthController.isUserConnected,
  PollsController.readByUser
);
router.get(
  "/getcommentlength/:id",
  AuthController.isUserConnected,
  PollsController.getCommentLength
);
router.put("/:id", AuthController.isUserConnected, PollsController.edit);
router.post("/", AuthController.isUserConnected, PollsController.add);
router.post("/agree", AuthController.isUserConnected, PollsController.agree);
router.post(
  "/disagree",
  AuthController.isUserConnected,
  PollsController.disagree
);
router.delete("/:id", AuthController.isUserConnected, PollsController.delete);

module.exports = router;
