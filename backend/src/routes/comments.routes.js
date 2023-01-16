const express = require("express");

const { CommentsController, AuthController } = require("../controllers");

const router = express.Router();

router.get("/:id", CommentsController.findByPolls);
router.post(
  "/:pollsId",
  AuthController.isUserConnected,
  CommentsController.newComment
);

module.exports = router;
