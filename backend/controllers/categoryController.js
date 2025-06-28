const Category = require("../models/Category");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving categories", error: err.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ CategoryId: req.params.id });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving category", error: err.message });
  }
};

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      CategoryId: req.body.CategoryId,
      CategoryName: req.body.CategoryName
    });

    await newCategory.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding category", error: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const result = await Category.deleteOne({ CategoryId: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", error: err.message });
  }
};
