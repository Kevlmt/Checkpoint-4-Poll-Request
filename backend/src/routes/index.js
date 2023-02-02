const express = require("express");

const usersRoutes = require("./users.routes");
const commentsRoutes = require("./comments.routes");
const pollsRoutes = require("./polls.routes");
const categoriesRoutes = require("./categories.routes");
const messagesRoutes = require("./messages.routes");

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/polls", pollsRoutes);
router.use("/comments", commentsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/messages", messagesRoutes);

module.exports = router;
