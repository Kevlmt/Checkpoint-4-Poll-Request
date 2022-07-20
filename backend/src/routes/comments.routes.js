const express = require("express");

const { CommentsController, UsersController } = require("../controllers");

const router = express.Router();

// router.get("/:pollsId", CommentsController.browseByPolls);
router.post(
  "/",
  UsersController.isUserConnected,
  CommentsController.newComment
);

module.exports = router;
