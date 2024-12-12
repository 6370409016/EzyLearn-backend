const express = require('express');
const asyncHandler = require('express-async-handler');
const { getAllCourses, deleteCourse, createCourses, getCourseInfo, getMyCourseDetails, registerEnrolled, getEnrolledCourseDetails } = require('../service/courseService');



const getCourses = async (req, res) => {
    try {
        const courses = await getAllCourses();
        res.json(courses);
    } catch (error) {
        console.log(error);
    }
}


const deleteCourseById = async (req, res) => {

    const { id } = req.params;
    try {
        const response = await deleteCourse(id);
        if (response) {
            res.json({ response });
        }
    } catch (error) {
        console.log(error);
    }
}


//@desc add Course for the perticular user
//@ route POST /api/users/create-course
//@access private
const createCourse = async (req, res) => {
    const { user_id, title, author, catagory, description, assignment, quize, lessons, thumbnail } = req.body;
    if (!user_id || !title || !author || !catagory || !description || !lessons || !thumbnail) {
        res.status(400);
        throw new Error('All feilds are mandatory');
    }
    try {
        const response = await createCourses(req.body);
        if (response) {
            res.status(200).json({ message: "Course created Successfully" })
        } else {
            res.status(400);
            throw new Error('Course data is invalid');
        }
    } catch (error) {
        console.log(error);
    }


};


const getCourseDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getCourseInfo(id);
        if (response) {
            res.json(response);
        }
    } catch (error) {
        console.log(error);
    }
}

const myCourseInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getMyCourseDetails(id);
        if (response) {
            res.json({ response });
        }
    } catch (error) {
        console.log(error);
    }
}

const createEnrolledCourse = async (req, res) => {
    const { user_id, course_id, title, thumbnail, author, lessons, catagory } = req.body;

    if (!user_id || !course_id || !title || !thumbnail || !author || !lessons || !catagory) {
        res.status(400);
        throw new Error('All feilds are mandatory');
    }

    try {
        const response = await registerEnrolled(req.body);
        if (response) {
            res.status(200).json({ message: 'You are successfully enrolled the course' });
        }
    } catch (error) {
        if (error) {
            return res.status(409).json({ message: error.message });
        }
    }
}

const getEnrolledCoursesInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getEnrolledCourseDetails(id);
        if (response) {
            res.json(response);
        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}
module.exports = { createCourse, getCourses, deleteCourseById, getCourseDetails, myCourseInfo, createEnrolledCourse, getEnrolledCoursesInfo };
