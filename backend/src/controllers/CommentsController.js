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
