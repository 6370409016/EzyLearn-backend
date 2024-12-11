const asyncHandler = require('express-async-handler');
const { createUser, findByEmailId, findByGoogleId, findByGitHubId } = require('../repository/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const google0AuthStrategy = require('passport-google-oauth2').Strategy;
const githubAuthStrategy = require('passport-github').Strategy;
const { generateAccessToken, generateRefreshToken } = require('./tokenGenerate');



const registerUser = asyncHandler(async (userBody) => {
    const { name, email, password, role } = userBody;

    try {
        const isUserAvailable = await findByEmailId(email);
        if (isUserAvailable) {
            const error = new Error('Email id is already registered');
            error.statusCode = 409;
            throw error;
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await createUser({ name: userBody.name, email: userBody.email, password: hashPassword, role: userBody.role || '' });
            return user;
        }

    } catch (e) {
        console.error('register error-', e);
        throw e;
    }

});

const loginUser = asyncHandler(async (userBody) => {
    const { email, password } = userBody;

    try {
        const isUserPresent = await findByEmailId(email);
        if (isUserPresent && (await bcrypt.compare(password, isUserPresent.password))) {
            const accessToken = generateAccessToken(isUserPresent._id);
            const refreshToken = generateRefreshToken(isUserPresent._id);

            const loginData = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                userId: isUserPresent._id,
                userRole: isUserPresent.role
            }
            return loginData;
        }
        else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        throw error;
    }

});

const googleAuthService = () => {
    passport.use(
        new google0AuthStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5001/auth/google/callback",
            scope: ["profile", "email"]
        },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await findByGoogleId(profile.id);
                    if (!user) {
                        user = await createUser({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            authProvider: "Google"
                        });
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, null)
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })



}

const githubAuthServive = () => {
    passport.use(new githubAuthStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/auth/github/callback",
        scope: ["user", "user:email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            // console.log('profile details-', accessToken)
            try {
                let user = await findByGitHubId(profile.id);
                if (!user) {
                    user = await createUser({
                        githubId: profile.id,
                        name: profile.displayName,
                        email: profile._json.email || "nomail@gmail.com",
                        authProvider: "Github"
                    })

                }

                // const newAccessToken = await generateAccessToken(user._id);
                // const newRefreshToken = await generateRefreshToken(user._id);
                // user.accessToken = newAccessToken;
                // user = { ...user.toObject(), accessToken: newAccessToken, refreshToken: newRefreshToken, userId: user._id }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }

        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })

}




module.exports = { registerUser, loginUser, googleAuthService, githubAuthServive };


//facebook code to check either user is already logged in this ac

// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });


// {
//     status: 'connected',
//     authResponse: {
//         accessToken: '...',
//         expiresIn:'...',
//         signedRequest:'...',
//         userID:'...'
//     }
// }

// FB.getLoginStatus(function(response) {
//     if (response.status === 'connected') {
//       console.log(response.authResponse.accessToken);
//     }
//   });

