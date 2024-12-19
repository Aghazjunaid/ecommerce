const Category = require('../models/Category');

// Get all categories in a tree structure
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const categoryTree = buildCategoryTree(categories);
        return res.json(categoryTree);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Helper function to build category tree
const buildCategoryTree = (categories, parentId = null) => {
    return categories
    .filter(category => String(category._doc.parentId) === String(parentId))
    .map(category => ({
            ...category._doc,
            children: buildCategoryTree(categories, category._doc._id),
        }));
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name, parentId } = req.body;
    const category = new Category({ name, parentId: parentId ? parentId.trim() : null });

    try {
        const savedCategory = await category.save();
        return res.status(201).json(savedCategory);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, parentId } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, parentId },
            { new: true }
        );
        return res.json(updatedCategory);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await Category.findByIdAndDelete(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};