const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decode) => {
            if (err) {
                res.status(400);
                throw new Error('User is not authorized');
            }
            req.user = decode.userId;
            console.log(decode);
            next();
        })
    } else {
        res.status(401); // Unauthorized
        throw new Error('Authorization token is missing');
    }
});


module.exports = validateToken;