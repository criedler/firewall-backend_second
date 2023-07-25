const pool = require("../../config/mysql");
const bcrypt = require('bcrypt');
const tokenService = require('../../services/tokenService');
const authService = require('../../services/authService');


async function login(req, res) {
    try {
        const user = req.user;
        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        const error = await authService.setRefreshTokenInDatabase(refreshToken, user.id);

        if (!error) {
            return res.json({accessToken, refreshToken});
        } else {
            const status = error.status || 500;
            const message = error.message || 'Internal Server Error';
            return res.status(status).json({error: message});
        }
    } catch (error) {
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

async function register(req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;

    const error = await authService.insertUserIntoDatabase(username, hashedPassword);
    if (!error) {
        next();
    } else {
        const status = error.status || 500;
        const message = error.message || 'Internal Server Error';
        return res.status(status).json({error: message});
    }
}


async function refreshToken(req, res) {
    const accessToken = tokenService.generateAccessToken(req.user);
    return res.json({accessToken});
}

async function logout(req, res) {
    const user = req.user;
    const query = "UPDATE User SET refreshToken = NULL WHERE id = ?";
    const params = [user.id];

    try {
        await pool.query(query, params);
        console.log('query success');
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