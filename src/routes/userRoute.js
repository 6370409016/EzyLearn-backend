const express = require('express');
const router = express.Router();
const { userRegister, userLogin, getAllCourses,postMyCourse, MyCourses, handleRefreshToken } = require('../controller/userController');
const validateToken = require('../middleware/validateTokenHandler');
const { getUsersDetails, deleteAUserById, getAUserDetails, updateUserDetails } = require('../controller/adminController');



router.get('/', getAllCourses);
router.get('/getallusers', getUsersDetails);
router.post('/refresh', handleRefreshToken);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/mycourses/:id', postMyCourse);
router.post('/deleteuser/:id', deleteAUserById);
router.post('/updateuser/:id', updateUserDetails);
router.get('/mycourses/:id', MyCourses);
router.post('/getuser/:email', getAUserDetails);




module.exports = router;