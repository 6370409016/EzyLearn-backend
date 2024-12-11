const { getCourses, deleteCourseById, createCourse, getCourseDetail } = require('../repository/courseRepository');

const getAllCourses = async () => {
    try {
        const courses = await getCourses();
        if (courses) {
            return courses;
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteCourse = async (id) => {
    try {
        const response = await deleteCourseById(id);
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error)
    }
}

const createCourses = async (data) => {
    try {

        const response = await createCourse(data);
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error)
    }

}

const getCourseInfo = async (id) => {
    try {
        const response = await getCourseDetail(id);
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getAllCourses, deleteCourse, createCourses, getCourseInfo };