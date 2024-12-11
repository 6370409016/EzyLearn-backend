const UserCourse = require('../model/userCourseModel');

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

module.exports = { getCourses, deleteCourseById, createCourse, getCourseDetail };