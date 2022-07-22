const express = require("express");

const { CommentsController, UsersController } = require("../controllers");

const router = express.Router();

router.get("/:id", CommentsController.findByPolls);
router.post(
  "/:pollsId",
  UsersController.isUserConnected,
  CommentsController.newComment
);

module.exports = router;
