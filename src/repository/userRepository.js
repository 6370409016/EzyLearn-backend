const User = require('../model/userModel');

const createUser = async (userData) => {
    return await User.create(userData);
}

const findUserById = async (id) => {
    return await User.findOne({ _id: id });
}

const getAllUsers = async () => {
    return await User.find();
}
const findByEmailId = async (userEmail) => {
    return await User.findOne({ email: userEmail });
}

const findByGoogleId = async (googleId) => {
    return await User.findOne({ googleId: googleId });
}

const findByGitHubId = async (githubId) => {
    return await User.findOne({ githubId: githubId });
}

module.exports = { createUser, findByEmailId, findByGoogleId, findByGitHubId, getAllUsers, findUserById };