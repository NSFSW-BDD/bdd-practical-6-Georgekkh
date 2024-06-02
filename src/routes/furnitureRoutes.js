const express = require('express');
const router = express.Router();
const furnitureController = require('../controllers/furnitureController');

//define your routes
router.get('/', furnitureController.getAllFurnitures);
router.post('/', furnitureController.createNewFurniture);
router.get('/:fid', furnitureController.getFurnitureById);
router.put('/:fid', furnitureController.updateFurnitureById);
router.delete('/:fid', furnitureController.deleteFurnitureById);

module.exports = router;