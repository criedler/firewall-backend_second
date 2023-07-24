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
        return res.json({accessToken, refreshToken});
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('An error occurred during login');
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
        console.error('Error during register:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('Username not available')
        } else {
            return res.status(500).send('Error during registration');
        }
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