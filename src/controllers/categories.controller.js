const { where } = require("sequelize");
const Categories = require("../models/categories.model");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findOne({
      where: { id },
      include: [
        {
          model: Categories,
          as: "subcategories", // Model ilişkisinde verdiğin alias
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
