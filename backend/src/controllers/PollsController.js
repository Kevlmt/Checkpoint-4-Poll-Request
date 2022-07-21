/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
const models = require("../models");

class PollsController {
  static findAll = async (req, res) => {
    try {
      const [polls] = await models.polls.browseAll();

      const results = [];

      polls.forEach((poll) => {
        if (
          results.length === 0 ||
          results[results.length - 1].id !== poll.id
        ) {
          const pollData = {
            id: poll.id,
            text: poll.text,
            date: poll.date,
            author: poll.author,
            category_id: poll.category_id,
            category_name: poll.category_name,
            author_imgLink: poll.author_imgLink,
            usersAgree: [],
            usersDisagree: [],
          };

          if (poll.userAgree) {
            pollData.usersAgree.push(poll.userAgree);
          }

          if (poll.userDisagree) {
            pollData.usersDisagree.push(poll.userDisagree);
          }

          results.push(pollData);
        } else if (results[results.length - 1].id === poll.id) {
          if (poll.userAgree) {
            results[results.length - 1].usersAgree.push(poll.userAgree);
          }

          if (poll.userDisagree) {
            results[results.length - 1].usersDisagree.push(poll.userDisagree);
          }
        }
      });

      return res.status(200).send(results);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static readById = async (req, res) => {
    const polls_id = parseInt(req.params.id, 10);
    try {
      const [[polls]] = await models.polls.browseById(polls_id);
      if (!polls) {
        res.status(404).send("polls not found");
      }
      polls.agree = await models.polls.browseUsersAgreeId(polls_id);
      polls.disagree = await models.polls.browseUsersDisagreeId(polls_id);
      polls.comments = await models.comments.findAllByPolls(polls_id);
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
        users_id: req.userId,
      });
      if (!newPolls) {
        return res.status(404).send("error in posting polls");
      }
      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static agree = async (req, res) => {
    const { userId } = req;
    const { polls_id } = req.body;
    try {
      const [isAlreadyAgreed] = await models.polls.checkAlreadyAgreed(
        userId,
        polls_id
      );
      if (isAlreadyAgreed.length) {
        return res.status(404).send("Polls already voted");
      }
      const [isAlreadyDisagreed] = await models.polls.checkAlreadyDisagreed(
        userId,
        polls_id
      );
      if (isAlreadyDisagreed.length) {
        return res.status(404).send("Poll already voted");
      }
      const agree = models.polls.agree(userId, polls_id);
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
    const { polls_id } = req.body;
    try {
      const [isAlreadyDisagreed] = await models.polls.checkAlreadyDisagreed(
        userId,
        polls_id
      );
      if (isAlreadyDisagreed.length) {
        return res.status(404).send("Poll already voted");
      }
      const [isAlreadyAgreed] = await models.polls.checkAlreadyAgreed(
        userId,
        polls_id
      );
      if (isAlreadyAgreed.length) {
        return res.status(404).send("Polls already voted");
      }

      const disagree = models.polls.disagree(userId, polls_id);
      if (!disagree) {
        return res.status(404).send("error in disagreed");
      }
      return res.status(200).send("disagreed successfully");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = PollsController;
