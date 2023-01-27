/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
const models = require("../models");

class PollsController {
  static findAll = async (req, res) => {
    try {
      const [polls] = await models.polls.browseAll();
      const results = [];

      polls.forEach(async (poll) => {
        if (
          results.length === 0 ||
          results[results.length - 1].id !== poll.id
        ) {
          const pollData = {
            id: poll.id,
            text: poll.text,
            date: poll.date,
            author: poll.author,
            categoryId: poll.categoryId,
            categoryName: poll.categoryName,
            authorImgLink: poll.authorImgLink,
            authorId: poll.authorId,
            usersAgree: [],
            usersDisagree: [],
          };

          if (poll.userAgree && !pollData.usersAgree.includes(poll.userAgree)) {
            pollData.usersAgree.push(poll.userAgree);
          }

          if (
            poll.userDisagree &&
            !pollData.usersDisagree.includes(poll.userDisagree)
          ) {
            pollData.usersDisagree.push(poll.userDisagree);
          }
          results.push(pollData);
        } else if (results[results.length - 1].id === poll.id) {
          if (
            poll.userAgree &&
            !results[results.length - 1].usersAgree.includes(poll.userAgree)
          ) {
            results[results.length - 1].usersAgree.push(poll.userAgree);
          }

          if (
            poll.userDisagree &&
            !results[results.length - 1].usersDisagree.includes(
              poll.userDisagree
            )
          ) {
            results[results.length - 1].usersDisagree.push(poll.userDisagree);
          }
        }
      });

      return res.status(200).send(results);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static getCommentLength = async (req, res) => {
    const pollId = parseInt(req.params.id, 10);
    try {
      const [[commentLength]] = await models.comments.findCommentLength(pollId);
      return res.status(200).send(commentLength);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static readById = async (req, res) => {
    const pollId = parseInt(req.params.id, 10);
    const { userId } = req;
    try {
      const [[polls]] = await models.polls.browseById(pollId);
      if (!polls) {
        res.status(404).send("polls not found");
      }
      const [isAlreadyAgreed] = await models.agrees.checkAlreadyAgreed(
        userId,
        pollId
      );
      const [isAlreadyDisagreed] = await models.disagrees.checkAlreadyDisagreed(
        userId,
        pollId
      );
      if (isAlreadyAgreed.length) {
        polls.userAgree = true;
      } else {
        polls.userAgree = false;
      }
      if (isAlreadyDisagreed.length) {
        polls.userDisagree = true;
      } else {
        polls.userDisagree = false;
      }
      polls.usersAgree = await models.agrees.browseUsersAgreeId(pollId);
      polls.usersDisagree = await models.disagrees.browseUsersDisagreeId(
        pollId
      );

      return res.status(200).send(polls);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static readByUser = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try {
      const [polls] = await models.polls.browseByUser(userId);
      if (!polls) {
        res.status(404).send("polls not found");
      }
      return res.status(200).send(polls);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static add = async (req, res) => {
    const polls = req.body;
    try {
      const newPolls = await models.polls.create({
        ...polls,
        userId: req.userId,
      });
      if (!newPolls) {
        return res.status(404).send("error in posting polls");
      }
      const agree = await models.agrees.agree(req.userId, newPolls[0].insertId);
      if (!agree) {
        return res.status(404).send("Error in posting");
      }
      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static agree = async (req, res) => {
    const { userId } = req;
    const { pollId } = req.body;
    try {
      const [isAlreadyAgreed] = await models.agrees.checkAlreadyAgreed(
        userId,
        pollId
      );
      if (isAlreadyAgreed.length) {
        return res.status(404).send("Polls already voted");
      }
      const [isAlreadyDisagreed] = await models.disagrees.checkAlreadyDisagreed(
        userId,
        pollId
      );
      if (isAlreadyDisagreed.length) {
        return res.status(404).send("Poll already voted");
      }
      const agree = await models.agrees.agree(userId, pollId);
      if (!agree) {
        return res.status(404).send("error in agreed");
      }
      return res.status(200).send("agreed successfully");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static disagree = async (req, res) => {
    const { userId } = req;
    const { pollId } = req.body;
    try {
      const [isAlreadyDisagreed] = await models.disagrees.checkAlreadyDisagreed(
        userId,
        pollId
      );
      if (isAlreadyDisagreed.length) {
        return res.status(404).send("Poll already voted");
      }
      const [isAlreadyAgreed] = await models.agrees.checkAlreadyAgreed(
        userId,
        pollId
      );
      if (isAlreadyAgreed.length) {
        return res.status(404).send("Polls already voted.");
      }

      const disagree = await models.disagrees.disagree(userId, pollId);
      if (!disagree) {
        return res.status(404).send("Error in disagreed.");
      }
      return res.status(200).send("Disagreed successfully.");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static edit = async (req, res) => {
    const { userId, userRole } = req;
    const poll = req.body;
    const pollId = parseInt(req.params.id, 10);
    try {
      const [[pollFound]] = await models.polls.browseById(pollId);
      if (!poll) {
        return res.status(404).send("Poll doesn't exist.");
      }
      if (userId !== pollFound.authorId && userRole !== "ADMIN") {
        return res.status(403).send("You can't edit this poll");
      }
      const pollEdited = await models.polls.update(poll, pollId);
      return res.status(200).send(pollEdited);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = async (req, res) => {
    const { userId, userRole } = req;
    const pollId = parseInt(req.params.id, 10);
    try {
      const [[poll]] = await models.polls.browseById(pollId);
      if (!poll) {
        return res.status(404).send("Poll doesn't exist.");
      }
      if (userId !== poll.authorId && userRole !== "ADMIN") {
        return res.status(403).send("You can't delete this poll");
      }
      const deletedPoll = await models.polls.delete(pollId);
      if (deletedPoll.affectedRows === 0) {
        return res.status(404).send("Error in deleting poll");
      }
      return res.status(200).send("Poll deleted.");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = PollsController;
