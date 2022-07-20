const models = require("../models");

class CategoriesController {
  static browseAll = async (req, res) => {
    try {
      const [categories] = await models.categories.findAll();
      if (!categories) {
        res.status(404).send("categories not found");
      }
      return res.status(200).send(categories);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}
module.exports = CategoriesController;
