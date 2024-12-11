const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.ACCESS_SECRET_TOKEN,
        { expiresIn: '1h' });

    return token;
}

const generateRefreshToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.ACCESS_REFRESH_TOKEN,
        { expiresIn: '1d' }
    )

    return token;
}

module.exports = { generateAccessToken, generateRefreshToken }; 