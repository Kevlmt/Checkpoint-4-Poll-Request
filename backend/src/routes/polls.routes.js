const express = require("express");

const { PollsController, UsersController } = require("../controllers");

const router = express.Router();

router.get("/", PollsController.findAll);
router.get("/:id", PollsController.readById);
router.post("/", UsersController.isUserConnected, PollsController.add);
// router.get("/categories/:categoryId", PollsController.findByCategories);
// router.post("/agree", UsersController.isUserConnected, PollsController.agree);
// router.post(
//   "/disagree",
//   UsersController.isUserConnected,
//   PollsController.disagree
// );

module.exports = router;
