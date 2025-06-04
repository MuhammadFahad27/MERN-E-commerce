const express = require('express') ;
const { addToCart, removeFromCart, cartItems,removeProduct, deleteCart, } = require('../Controllers/cart.controller');
const verifyUser = require('../Middlewares/verifyUser');

const router = express.Router()  ;

router.post('/add-to-cart/:id/:userId',verifyUser,addToCart) ;
router.delete('/remove-from-cart/:id/:userId',verifyUser,removeFromCart) ;
router.get('/all-cart-items/:userId',verifyUser,cartItems) ;
router.delete('/remove-product/:id/:userId',verifyUser,removeProduct) ;
router.delete('/clear-cart/:userId',verifyUser,deleteCart) ; 







module.exports = router ;