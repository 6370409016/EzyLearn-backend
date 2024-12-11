const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema(
    {

        lessonId: { type: Number },
        lessonName: { type: String, required: true },
        videoLink: { type: String },
        audioLink: { type: String },
        slidesLink: { type: String }
    },
    { _id: false }
);


const userCourse = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, 'Please add course-title']
    },

    author: {
        type: String,
        required: [true, 'Please add author name']
    },
    catagory: {
        type: String,
        required: [true, 'Please add catagory']
    },

    thumbnail: {
        type: String,
        required: [true, 'Please add thumbnail']
    },

    description: {
        type: String,
        required: [true, 'Please add description']
    },

    assignment: {
        type: String,
    },

    quize: {
        type: String
    },

    lessons: {
        type: [lessonSchema],
        default: [],

    }

}, {
    timestamps: true
})

module.exports = mongoose.model('UserCourse', userCourse);