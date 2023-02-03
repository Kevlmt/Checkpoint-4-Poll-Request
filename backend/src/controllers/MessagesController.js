const models = require("../models");

class MessagesController {
  static readMessages = async (req, res) => {
    const fromId = req.userId;
    const toId = req.params.id;
    try {
      const [messagesSent] = await models.messages.readSent(fromId, toId);
      const [messagesReceived] = await models.messages.readReceived(
        fromId,
        toId
      );
      const allMessages = [...messagesSent, ...messagesReceived];
      return res.status(200).send(allMessages);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static test = async (req, res) => {
    const userId = req;
    try {
      const [data] = await models.users.findAllChat(userId);
      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static sendMessage = async (req, res) => {
    const { text, toId } = req.body;
    const fromId = req.userId;

    try {
      const newMessage = await models.messages.create({ text, fromId, toId });
      if (!newMessage) {
        return res.status(404).send("error in create new message");
      }
      return res.status(201).send("message created");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = MessagesController;
