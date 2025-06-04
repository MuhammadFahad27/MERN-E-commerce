const express = require('express') ;
const { signUp, signIn, signOut, checkAuth } = require('../Controllers/auth.controller');

const router = express.Router() ;

router.post('/auth/sign-up',signUp)
router.post('/auth/sign-in',signIn)
router.post('/auth/sign-out',signOut)
router.get('/auth/verification',checkAuth)




module.exports = router 