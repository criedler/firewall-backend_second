const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(configurePayLoad(user), process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
}

function generateRefreshToken(user) {
    return jwt.sign(configurePayLoad(user), process.env.REFRESH_TOKEN_SECRET);
}

function configurePayLoad(user) {
    return {
        userId: user.id,
        username: user.username,
        userRole: user.role
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}