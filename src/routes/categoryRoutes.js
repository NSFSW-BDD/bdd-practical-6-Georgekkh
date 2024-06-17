const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//define your routes
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createNewCategory);
router.get('/:catid', categoryController.getCategoryById);
router.put('/:catid', categoryController.updateCategoryById);
router.delete('/:catid', categoryController.deleteCategoryById);

module.exports = router;