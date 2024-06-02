const furnitureModel = require('../models/furnitureModel');

const furnitureController = {
    getAllFurnitures: (req, res, next) => {
        furnitureModel.selectAllFurniture((error, results) => {
            if (error) {
                console.error("Error getAllFurnitures:", error);
                return res.status(500).json(error);
            }
            res.status(200).json(results);
        });
    },

    getFurnitureById: (req, res, next) => {
        const data = { fid: req.params.fid };
        furnitureModel.selectFurnitureById(data, (error, results) => {
            if (error) {
                console.error("Error getFurnitureById:", error);
                return res.status(500).json(error);
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Furniture not found" });
            }
            res.status(200).json(results[0]);
        });
    },

    createNewFurniture: (req, res, next) => {
        const data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            catid: req.body.catid
        };
        furnitureModel.createNewFurniture(data, (error, results) => {
            if (error) {
                console.error("Error createNewFurniture:", error);
                return res.status(500).json(error);
            }
            res.status(201).json({ message: "Furniture created successfully", fid: results.insertId });
        });
    },

    updateFurnitureById: (req, res, next) => {
        const data = {
            fid: req.params.fid,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            catid: req.body.catid
        };
        furnitureModel.updateFurnitureById(data, (error, results) => {
            if (error) {
                console.error("Error updateFurnitureById:", error);
                return res.status(500).json(error);
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Furniture not found" });
            }
            res.status(200).json({ message: "Furniture updated successfully" });
        });
    },

    deleteFurnitureById: (req, res, next) => {
        const data = { fid: req.params.fid };
        furnitureModel.deleteFurnitureById(data, (error, results) => {
            if (error) {
                console.error("Error deleteFurnitureById:", error);
                return res.status(500).json(error);
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Furniture not found" });
            }
            res.status(200).json({ message: "Furniture deleted successfully" });
        });
    }
};

module.exports = furnitureController;