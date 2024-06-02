const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

//define your routes
router.get('/', controller.getAllCategories);
router.post('/', controller.createNewCategory);
router.get('/:catid', controller.getCategoryById);
router.put('/:catid', controller.updateCategoryById);
router.delete('/:catid', controller.deleteCategoryById);

module.exports = router;