const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { userRegister, userLogin, handleRefreshToken, logOut } = require('../controller/userController');
const { getUsersDetails, deleteAUserById, getAUserDetails, updateUserDetails } = require('../controller/adminController');




router.get('/getallusers', getUsersDetails);
router.post('/refresh', handleRefreshToken);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', logOut);
router.get('/deleteuser/:id', validateToken, deleteAUserById);
router.post('/updateuser/:id', validateToken, updateUserDetails);
router.post('/getuser/:email', getAUserDetails);




module.exports = router;