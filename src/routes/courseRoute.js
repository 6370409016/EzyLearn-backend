const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { createCourse, getCourses, deleteCourseById, getCourseDetails } = require('../controller/courseController')

router.post('/create-course', validateToken, createCourse);
router.get('/getallcourses', getCourses);
router.post('/deletecourse/:id', deleteCourseById);
router.post('/getcourse/:id', getCourseDetails);

module.exports = router;