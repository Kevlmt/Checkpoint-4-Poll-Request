const models = require("../models");

class CommentsController {
  static newComment = (req, res) => {
    const comments = req.body;

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
}

module.exports = CommentsController;
