const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Routes
router.get('/get-categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/add-category', categoryController.addCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);


module.exports = router;
