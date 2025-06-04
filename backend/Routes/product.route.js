const express = require('express') ;
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, productReviews, getAllReviews, deleteReview, searchProducts, getProducts } = require('../Controllers/product.controller');
const verifyUser = require('../Middlewares/verifyUser');
const { upload } = require('../Utils/multer');

const router = express.Router() ;

router.get('/all-products',getAllProducts)
router.post('/create-product/:user',upload.array('images'),verifyUser,createProduct)
router.put('/update-product/:id',upload.array('images'),verifyUser,updateProduct)
router.delete('/admin/delete-product/:id',verifyUser,deleteProduct)
router.get('/details/:id',getProductDetails)

router.post('/reviews/:userId/:id',verifyUser,productReviews) ;
router.get('/all-reviews',getAllReviews) ;
router.delete('/delete-review/:id/:rId',verifyUser,deleteReview) ;
router.get('/admin/search-products',verifyUser,searchProducts) ;
router.get('/get/products',getProducts) ;








module.exports = router ;