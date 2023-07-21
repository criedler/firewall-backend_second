const pool = require("../../config/mysql");
const bcrypt = require('bcrypt');
const tokenService = require('../../services/tokenService');


async function login(req, res) {
    const user = req.user;
    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    const query = "UPDATE User SET refreshToken = ? WHERE User.id = ?";
    const params = [refreshToken, user.id];

    try {
        await pool.query(query, params);
        res.json({accessToken, refreshToken});
    } catch (error) {
        return res.status(500).json({error: "An error occurred during login"});
    }
}

async function register(req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    const query = "INSERT INTO User (username, password, role) VALUES (?, ?, 'Admin')";
    const params = [username, hashedPassword];

    try {
        await pool.query(query, params);
        next()
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('Username not available')
        } else {
            return res.status(500).send('Error during registration');
        }
    }
}

async function refreshToken(req, res) {
    const accessToken = tokenService.generateAccessToken(req.user);
    res.json({accessToken});
}

async function logout(req, res) {
    const user = req.user;
    const query = "UPDATE User SET refreshToken = NULL WHERE User.id = ?";
    const params = [user.id];

        try {
        await pool.query(query, params);
    } catch (error) {
        return res.status(500).json({error: "An error occurred during logout"});
    }
}

module.exports = {
    login,
    register,
    refreshToken,
    logout
}