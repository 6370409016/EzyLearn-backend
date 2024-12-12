const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const UserEnrolledCourses = require('../model/enrolledCourseModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const UserCourses = require('../model/userCourseModel');
const { registerUser, loginUser } = require('../service/userAuthService');



//@desc Register the user
//@ route POST /api/users/register
//@access public
const userRegister = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All feilds are mandatory");
        return;
    }
    try {
        const user = await registerUser(req.body);
        if (user) {
            console.log('User is Successfully created');
            res.status(202).json({ message: 'User is Successfully registered' });
        }

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message })
    }



})



//@desc Login the user
//@ route POST /api/users/login
//@access public
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('All feilds are mandatory');
        return;
    }

    try {
        const loginData = await loginUser(req.body);

        if (loginData.accessToken) {
            res.cookie('refreshToken', loginData.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 60 * 60 * 1000
            });


            res.status(200).json({
                accessToken: loginData.accessToken,
                userId: loginData.userId,
                role: loginData.userRole
            });
        }
    } catch (error) {
        throw error;
    }



});

const logOut = async (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true, 
            sameSite: 'Strict',
            path: '/',
        });

        return res.status(200).json({ message: "Successfully logged out." });
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh Token is provided' });

    }

    jwt.verify(refreshToken, process.env.ACCESS_REFRESH_TOKEN, (err, decode) => {
        if (err) {
            res.send(403);
            throw new Error('Invalid Token');
        }

        const accessToken = jwt.sign({ userId: decode.id }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '15m' });
        res.json({ accessToken: accessToken });
    })

}

//@desc Initiate Google Authentication
//@route GET /api/users/auth/google
//@access public
const googleAuth = (req, res, next) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);

}
//@desc Handle Google Authentication Callback
//@route GET /api/users/auth/google/callback
//@access public
const googleAuthCallback = (req, res, next) => {
    passport.authenticate("google", {
        successRedirect: "http://localhost:3001",
        failureRedirect: "http://localhost:3001/login"
    })
        (req, res, next);
}


//@desc Initiate Google Authentication
//@route GET /api/users/auth/google
//@access public
const githubAuth = (req, res, next) => {
    passport.authenticate("github", { scope: ["profile", "email"] })(req, res, next);

}

//@desc Initiate Google Authentication
//@route GET /api/users/auth/google/callback
//@access public
const githubAuthCallback = (req, res, next) => {
    passport.authenticate("github", {
        successRedirect: "http://localhost:3001",
        failureRedirect: "http://localhost:3001/login"
    })
        (req, res, next);
}




module.exports = {
    userRegister, userLogin, googleAuth, googleAuthCallback, githubAuth, githubAuthCallback, handleRefreshToken, logOut
};