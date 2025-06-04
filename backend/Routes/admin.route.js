const express = require('express') ;
const verifyUser = require('../Middlewares/verifyUser');
const { getAllUsers, getSingleUser, updateRole, deleteUser, userOrders, allOrders, deleteOrder } = require('../Controllers/admin.controller');

const router = express.Router() ;

router.get('/admin/all-users',verifyUser,getAllUsers) ;
router.get('/admin/user/:userId',verifyUser,getSingleUser)
router.put('/admin/update-role/:id',verifyUser,updateRole)
router.delete('/admin/delete-user/:id',verifyUser,deleteUser)
router.get('/admin/user-orders/:id',verifyUser, userOrders)
router.get('/admin/all-orders',verifyUser, allOrders)
router.delete('/admin/delete-order/:id',verifyUser,deleteOrder)





module.exports = router 