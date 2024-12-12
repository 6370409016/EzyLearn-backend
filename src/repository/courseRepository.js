const UserCourse = require('../model/userCourseModel');
const EnrolledCourses = require('../model/enrolledCourseModel');


const getCourses = async () => {
    try {
        return await UserCourse.find();
    } catch (error) {
        console.log(error);
    }
}

const deleteCourseById = async (id) => {
    try {
        return await UserCourse.findByIdAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }
}

const createCourse = async (data) => {
    try {
        return await UserCourse.create(data);
    } catch (error) {
        console.log(error);
    }
}

const getCourseDetail = async (id) => {
    try {
        return await UserCourse.findOne({ _id: id });
    } catch (error) {
        console.log(error);
    }
}

const getMyCourse = async (id) => {
    try {
        return await UserCourse.find({ user_id: id });
    } catch (error) {
        console.log(error);
    }
}

const findCourseById = async (id) => {
    try {
        return await EnrolledCourses.findOne({ course_id: id });
    } catch (error) {
        console.log(error);
    }
}
const createEnrolledCourse = async (data) => {
    try {
        return await EnrolledCourses.create(data);
    } catch (error) {
        console.log(error);
    }
}

const getEnrolledCourses = async (id) => {
    try {
        return await EnrolledCourses.find({ user_id: id });
    } catch (error) {
        throw error;
    }
}

module.exports = { getCourses, deleteCourseById, createCourse, getCourseDetail, getMyCourse, findCourseById, createEnrolledCourse, getEnrolledCourses };