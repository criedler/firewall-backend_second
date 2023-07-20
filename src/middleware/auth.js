const pool = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
    try {
        const query = "SELECT * FROM User WHERE username = ?";
        const [rows] = await pool.query(query, [req.body.username]);
         console.log(rows)

        if (rows.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const storedPassword = rows[0].password;
        const passwordMatch = await bcrypt.compare(req.body.password, storedPassword);

        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }

        req.user = rows[0];
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during authentication');
    }
}


function verifyAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('No token provided');
    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (InvalidAccessError) {
        return res.status(401).send('invalid  token')
    }
    next()

}

async function verifyRefreshToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader && authHeader.split(' ')[1];

    if (!refreshToken) return res.status(401).send('No refresh token provided');

    try {
        req.user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (InValidAccessError) {
        return res.status(401).send('invalid refresh token')
    }

    const query = 'SELECT refreshToken FROM User WHERE refreshToken = ?';
    const [rows] = await pool.query(query, [refreshToken]);
    const tokenExists = rows.length > 0;

    if (!tokenExists) {
        return res.status(401).json({message: 'Invalid refresh token'});
    }
    next()
}

function authorizeForAdmin(req, res, next) {
    if (req.user.userRole !== 'Admin') {
        return res.sendStatus(403)
    }
    next()
}

function checkAccess(req,res,next){
    if(req.user.username!==req.params.list){
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

