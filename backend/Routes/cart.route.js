const express = require('express');
const { addToCart, removeFromCart, cartItems, removeProduct, deleteCart } = require('../Controllers/cart.controller');
const verifyUser = require('../Middlewares/verifyUser');

const router = express.Router();

// Support both /:id and legacy /:id/:userId without breaking Express 5 route parser
router.post('/add-to-cart/:id', verifyUser, addToCart);
router.post('/add-to-cart/:id/:userId', verifyUser, addToCart);

router.delete('/remove-from-cart/:id', verifyUser, removeFromCart);
router.delete('/remove-from-cart/:id/:userId', verifyUser, removeFromCart);

router.get('/all-cart-items', verifyUser, cartItems);
router.get('/all-cart-items/:userId', verifyUser, cartItems);

router.delete('/remove-product/:id', verifyUser, removeProduct);
router.delete('/remove-product/:id/:userId', verifyUser, removeProduct);

router.delete('/clear-cart', verifyUser, deleteCart);
router.delete('/clear-cart/:userId', verifyUser, deleteCart);

module.exports = router;
