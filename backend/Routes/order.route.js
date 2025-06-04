const express = require('express') ;
const verifyUser = require('../Middlewares/verifyUser');
const { createOrder, getSingleOrder, getAllOrders, Orders, updateStatus } = require('../Controllers/order.controller');

const router = express.Router() ;
 
router.post('/create-order',verifyUser,createOrder) ;
router.get('/user-order/:id',getSingleOrder) ;
router.get('/all/user-orders',verifyUser,getAllOrders) ;
router.get('/admin/orders',verifyUser,Orders) ;
router.put('/admin/update-status/:id',verifyUser,updateStatus) ;





module.exports = router 