const categoryModel = require("../models/categoryModel");

const categoryController = {
    getAllCategories: (req, res, next) => {
        categoryModel.selectAllCategory((error, results) => {
            if (error) {
                console.error("Error getAllCategories:", error);
                return res.status(500).json(error);
            }
            res.status(200).json(results);
        });
    }, 

    getCategoryById: (req, res, next) => {
        const data = { catid: req.params.catid };
        categoryModel.selectCategoryById(data, (error, results) => {
            if (error) {
                console.error("Error getCategoryById:", error);
                return res.status(500).json(error);
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(results[0]);
        });
    }, 

    createNewCategory: (req, res, next) => {
        const data = {
            name: req.body.name,
            description: req.body.description
        };
        categoryModel.createNewCategory(data, (error, results) => {
            if (error) {
                console.error("Error createNewCategory:", error);
                return res.status(500).json(error);
            }
            res.status(201).json({ message: "Category created successfully", catid: results.insertId });
        });
    },

    updateCategoryById: (req, res, next) => {
        const data = {
            catid: req.params.catid,
            name: req.body.name,
            description: req.body.description
        };
        categoryModel.updateCategoryById(data, (error, results) => {
            if (error) {
                console.error("Error updateCategoryById:", error);
                return res.status(500).json(error);
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({ message: "Category updated successfully" });
        });
    },

    deleteCategoryById: (req, res, next) => {
        const data = { catid: req.params.catid };
        categoryModel.deleteCategoryById(data, (error, results) => {
            if (error) {
                console.error("Error deleteCategoryById:", error);
                return res.status(500).json(error);
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({ message: "Category deleted successfully" });
        });
    }
};

module.exports = categoryController;
