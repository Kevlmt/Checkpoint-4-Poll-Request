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

  static create = async (req, res) => {
    const category = req.body;
    try {
      const newCategory = await models.categories.create(category);
      if (!newCategory) {
        return res.status(404).send("An error occurs when creating a category");
      }
      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static edit = async (req, res) => {
    const category = req.body;
    const categoryId = parseInt(req.params.id, 10);
    try {
      const modifiedCategory = await models.categories.edit(
        category,
        categoryId
      );
      if (modifiedCategory.affectedRows === 0) {
        return res.status(404).send("category not found");
      }
      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    try {
      await models.categories.delete(categoryId);
      return res.status(200).send("category deleted successfully");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = CategoriesController;
