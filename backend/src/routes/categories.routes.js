const express = require("express");

const { CategoriesController } = require("../controllers");

const router = express.Router();

router.get("/", CategoriesController.browseAll);

module.exports = router;
