const express = require('express') ;
const { getUserDetails, updateProfile, filterUsers } = require('../Controllers/user.controller');
const verifyUser = require('../Middlewares/verifyUser');

const router = express.Router() ;

router.get('/user-details/:id',verifyUser,getUserDetails)
router.put('/update-user/:id',verifyUser,updateProfile)
router.get('/get-users',verifyUser,filterUsers)






module.exports = router 