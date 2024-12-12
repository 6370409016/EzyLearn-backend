const { getCourses, deleteCourseById, createCourse, getCourseDetail, getMyCourse, findCourseById, createEnrolledCourse, getEnrolledCourses } = require('../repository/courseRepository');

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

const getMyCourseDetails = async (id) => {
    try {
        const response = await getMyCourse(id);
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

const registerEnrolled = async (data) => {
    try {

        isCoursePresent = await findCourseById(data.course_id);
        if (isCoursePresent) {
            throw new Error('You have already enrolled the course');
        } else {
            const response = await createEnrolledCourse(data);
            if (response) {
                return response;
            }
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getEnrolledCourseDetails = async (id) => {
    try {
        const response = getEnrolledCourses(id);
        if (response) {
            return response;
        }
    } catch (error) {
        throw error;
    }
}
module.exports = { getAllCourses, deleteCourse, createCourses, getCourseInfo, getMyCourseDetails, registerEnrolled, getEnrolledCourseDetails };