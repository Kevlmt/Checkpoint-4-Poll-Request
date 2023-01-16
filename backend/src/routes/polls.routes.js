const express = require("express");

const { PollsController, AuthController } = require("../controllers");

const router = express.Router();

router.get("/", PollsController.findAll);
router.get("/:id", PollsController.readById);
router.put("/:id", AuthController.isUserConnected, PollsController.edit);
router.post("/", AuthController.isUserConnected, PollsController.add);
router.post("/agree", AuthController.isUserConnected, PollsController.agree);
router.post(
  "/disagree",
  AuthController.isUserConnected,
  PollsController.disagree
);
router.delete("/:id", AuthController.isUserConnected, PollsController.delete);

module.exports = router;
