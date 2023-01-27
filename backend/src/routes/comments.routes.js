const express = require("express");

const { CommentsController, AuthController } = require("../controllers");

const router = express.Router();

router.get(
  "/:id",
  AuthController.isUserConnected,
  CommentsController.findByPolls
);
router.post(
  "/:pollId",
  AuthController.isUserConnected,
  CommentsController.newComment
);
router.put(
  "/:id",
  AuthController.isUserConnected,
  CommentsController.editComment
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  CommentsController.deleteComment
);

module.exports = router;
