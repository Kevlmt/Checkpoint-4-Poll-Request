const express = require("express");

const { CategoriesController, AuthController } = require("../controllers");

const router = express.Router();

router.get("/", AuthController.isUserConnected, CategoriesController.browseAll);
router.post(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  CategoriesController.create
);
router.put(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  CategoriesController.edit
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  CategoriesController.delete
);

module.exports = router;
