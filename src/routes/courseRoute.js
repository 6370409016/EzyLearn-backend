const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { createCourse, getCourses, deleteCourseById, getCourseDetails, myCourseInfo, createEnrolledCourse, getEnrolledCoursesInfo } = require('../controller/courseController')

router.post('/create-course', validateToken, createCourse);
router.post('/create-enrolled-course', createEnrolledCourse);
router.get('/getallcourses', getCourses);
router.get('/deletecourse/:id', validateToken, deleteCourseById);
router.post('/getcourse/:id', getCourseDetails);
router.get('/getmycourse/:id', myCourseInfo);
router.get('/getenrolledcourses/:id', getEnrolledCoursesInfo);


module.exports = router;