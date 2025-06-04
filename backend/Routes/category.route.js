const express = require('express') ;
const { createCategory, deleteCategory, updateCategory, readCategories, searchCategory } = require('../Controllers/category.controller');
const verifyUser = require('../Middlewares/verifyUser');
const router = express.Router() ;


router.post('/create-category',verifyUser,createCategory) 
router.delete('/delete-category/:id',verifyUser,deleteCategory)
router.put('/update-category/:id',verifyUser,updateCategory) 
router.get('/get-categories',readCategories)  
router.get('/admin/get-categories/:category',verifyUser,searchCategory)  





module.exports = router 