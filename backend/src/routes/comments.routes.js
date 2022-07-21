const express = require("express");

const { CommentsController, UsersController } = require("../controllers");

const router = express.Router();

router.get("/:id", CommentsController.findByPolls);
router.post(
  "/",
  UsersController.isUserConnected,
  CommentsController.newComment
);

module.exports = router;
