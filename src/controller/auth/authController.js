const pool = require("../../config/mysql");
const bcrypt = require('bcrypt');
const tokenService = require('../../services/tokenService');
const authService = require('../../services/authService');


async function login(req, res) {

    const user = req.user;
    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    const error = await authService.setRefreshTokenInDatabase(refreshToken, user.id);

    if (!error) {
        return res.json({success: true, accessToken, refreshToken});
    } else {
        return res.status(error.status).json({success: false, message: error});
    }

}

async function register(req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;

    const error = await authService.insertUserIntoDatabase(username, hashedPassword);
    if (!error) {
        next();
    } else {
        return res.status(error.status).json({success: false, message: error});
    }
}


async function refreshToken(req, res) {
    const accessToken = tokenService.generateAccessToken(req.user);
    return res.status(200).json({success: true, accessToken: accessToken});
}

async function logout(req, res) {
    const user = req.user;
    const query = "UPDATE User SET refreshToken = NULL WHERE id = ?";
    const params = [user.userId];

    try {
        await pool.query(query, params);
        return res.status(200).send(`Logged out ${user.username}`)
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).send("An error occurred during logout");
    }
}

module.exports = {
    login,
    register,
    refreshToken,
    logout
}