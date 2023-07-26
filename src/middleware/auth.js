const pool = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function authenticate(req, res, next) {
    try {
        const query = "SELECT * FROM User WHERE username = ?";
        const [user] = await pool.query(query, [req.body.username]);

        if (user.length === 0) {
            return res.status(401).json({success:false, message:`User ${req.body.username} not found`});
        }

        const storedPassword = user[0].password;
        const passwordMatch = await bcrypt.compare(req.body.password, storedPassword);

        if (!passwordMatch) {
            return res.status(401).json({success:false,message:`Password for ${req.body.username} incorrect`});
        }
        req.user = user[0];
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({success:false,statusText:'Internal Server Error'});
    }
}

function verifyAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next()
    } catch (error) {
        console.error('Error during accessToken verification:', error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({success:false,message:'Token expired'})
        } else {
            return res.status(401).json({success:false,message:'Token invalid or not provided'});
        }
    }
}

async function verifyRefreshToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader && authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.error('Error during refreshToken verification:', error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({success:false,message:'RefreshToken expired'});
        } else {
            return res.status(401).send({success:false,message:'RefreshToken invalid or not provided'});
        }
    }
    const userId = req.user.userId;
    const query = 'SELECT refreshToken FROM User WHERE id = ? AND refreshToken = ?';
    const params = [userId, refreshToken];

    try {
        const [result] = await pool.query(query, params);
        const refreshTokenExists = result.length > 0;
        if (!refreshTokenExists) {
            return res.status(401).json({success:false, message:'RefreshToken not found in database, user is not logged in' });
        }
        next()
    } catch (error) {
        console.error('Error during getting refreshToken from Database:', error);
        return res.status(500).json({success:false,message:'Error while getting refreshToken from database'});
    }
}

function authorizeForAdmin(req, res, next) {
    if (req.user.userRole !== 'Admin') {
        return res.status(403).json({success:false,message:'User is not an admin'});
    }
    next()
}

function checkAccess(req, res, next) {
    if (req.user.username !== req.params.list) {
        return res.status(403).json({success:false,message:'User is not allowed to access this list'});
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

