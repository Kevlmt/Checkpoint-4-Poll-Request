/* eslint-disable camelcase */
const models = require("../models");

class CommentsController {
  static findByPolls = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const comments = await models.comments.findByPolls(id);
      if (!comments) {
        return res.status(404).send("no comments found");
      }
      return res.status(200).send(comments);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static newComment = (req, res) => {
    const comments = req.body;
    comments.polls_id = parseInt(req.params.pollsId, 10);
    if (!comments.text || !comments.polls_id) {
      return res.sendStatus(400);
    }
    models.comments
      .insert({ ...comments, users_id: req.userId })
      .then(([result]) => {
        return res.status(201).send({ ...comments, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
    return null;
  };

  static editComment = async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = req.body;
    try {
      const commentFounded = await models.comment.findById(commentId);
      if (!commentFounded) {
        return res.status(404);
      }
      if (commentFounded.users_id !== req.id || req.role !== "ADMIN") {
        return res.status(403);
      }
      const editedComment = await models.comment.editComment(
        comment,
        commentId
      );

      if (editedComment.affectedRows === 0) {
        return res.status(400);
      }
      return res.status(200).send(editedComment);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    try {
      await models.comment.deleteComment(commentId);
      return res.status(200).send("comment deleted successfully");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = CommentsController;
