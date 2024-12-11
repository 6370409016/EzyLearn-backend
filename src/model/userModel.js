const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add user name']
    },

    googleId: {
        type: String
    },

    githubId: {
        type: String
    },

    authProvider: {
        type: String,
        default: "form"
    },
    email: {
        type: String,
        required: [true, 'Please add email address'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },

    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

},
    {
        timestamps: true
    }

);


module.exports = mongoose.model("User", userSchema);