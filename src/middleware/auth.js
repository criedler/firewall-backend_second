const pool = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function authenticate(req, res, next) {
    try {
        const query = "SELECT * FROM User WHERE username = ?";
        const [result] = await pool.query(query, [req.body.username]);

        if (result.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const storedPassword = result[0].password;
        const passwordMatch = await bcrypt.compare(req.body.password, storedPassword);

        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }
        req.user = result[0];
        next();
    } catch (error) {
        res.status(500).send('Error during authentication');
    }
}

function verifyAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send('Token expired')
        } else {
            return res.status(498).send('Token invalid or not provided');
        }
    }
}

async function verifyRefreshToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader && authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send('RefreshToken expired');
        } else {
            return res.status(498).send('RefreshToken invalid or not provided');
        }
    }
    const userId = req.user.id;
    const query = 'SELECT refreshToken FROM User WHERE id = ? AND refreshToken = ?';
    const params = [userId, refreshToken];

    try {
        const [result] = await pool.query(query, params);
        const refreshTokenExists = result.length > 0;
        if (!refreshTokenExists) {
            return res.status(401).send(`RefreshToken not found in database, user is not logged in`)
        }
        next()
    } catch (error) {
        return res.status(500).send(`Error while getting refreshToken from database`);
    }
}

function authorizeForAdmin(req, res, next) {
    if (req.user.userRole !== 'Admin') {
        return res.sendStatus(403)
    }
    next()
}

function checkAccess(req, res, next) {
    if (req.user.username !== req.params.list) {
        return res.sendStatus(403)
    }
    next()
}

module.exports = {
    authenticate,
    verifyAccessToken,
    verifyRefreshToken,
    authorizeForAdmin,
    checkAccess
};

