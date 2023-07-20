const pool = require("../../config/mysql");
const bcrypt = require('bcrypt');
const tokenService = require('../../services/tokenService');


async function login(req, res, next) {
    try {
        const user = req.user;

        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        const query = "UPDATE User SET refreshToken = ? WHERE User.id = ?";
        const params = [refreshToken, user.id];

        await pool.query(query, params);

        res.json({ accessToken, refreshToken });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during login" });
    }
}


async function register (req, res,next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const username = req.body.username;

        const query = "INSERT INTO User (username, password, role) VALUES (?, ?, 'Admin')";
        const params = [username, hashedPassword];
        const results = await pool.query(query, params);

        if (results[0].affectedRows > 0) {
            return next()
        } else {
            return res.status(409).send("No user created");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error during registration');
    }
}

async function refreshToken(req,res){
    const accessToken = tokenService.generateAccessToken(req.user);
    res.json({ accessToken });
}

async function logout(req, res) {
    try {
        const user = req.user;
        const query = "UPDATE User SET refreshToken = NULL WHERE User.id = ?";
        const params = [User.id];

        await pool.query(query, params);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during logout" });
    }
}
module.exports={
    login,
    register,
    refreshToken,
    logout
}