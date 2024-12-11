const asyncHandler = require('express-async-handler');
const { createUser, findByEmailId, findByGoogleId, findByGitHubId, getAllUsers, findUserById } = require('../repository/userRepository');
const { deleteAUser, updateAUser } = require('../repository/adminRepository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const google0AuthStrategy = require('passport-google-oauth2').Strategy;
const githubAuthStrategy = require('passport-github').Strategy;
const { generateAccessToken, generateRefreshToken } = require('./tokenGenerate');

const getUsers = async () => {
    const users = await getAllUsers();
    return users;
}



const deleteUserById = async (id) => {
    try {
        const user = await findUserById(id);
        if (user.role === 'admin') {
            throw new Error('You cant delete Admin');
        } else {
            const response = await deleteAUser(id);
            return response;
        }

    } catch (err) {
        console.log(err);
    }

}

const getAUser = async (email) => {
    try {
        const user = await findByEmailId(email);
        if (user) {
            return user;
        }
    } catch (error) {
        console.log(error);
    }
}


const updateUser = async (body) => {
      

    try {
        const updateUserDetails = await updateAUser(body);
        if (updateAUser) {
            return updateUserDetails;
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getUsers, deleteUserById, getAUser, updateUser };