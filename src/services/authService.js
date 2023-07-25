const pool = require("../config/mysql");

async function setRefreshTokenInDatabase(refreshToken, userId) {
    const query = "UPDATE User SET refreshToken = ? WHERE User.id = ?";
    const params = [refreshToken, userId];

    try {
        await pool.query(query, params);
        return null;
    } catch (error) {
        console.error('Error during setting refreshToken:', error);
        return {status: 500, message: 'Error During Database operations'};
    }
}

async function insertUserIntoDatabase(username, hashedPassword) {
    const query = "INSERT INTO User (username, password, role) VALUES (?, ?, 'Admin')";
    const params = [username, hashedPassword];

    try {
        await pool.query(query, params);
        return null; // Success, no error
    } catch (error) {
        console.error('Error during register:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return {status: 409, message: 'Username already exists.'};
        } else {
            return {status: 500, message: 'Internal Server Error.'};
        }
    }
}


module.exports = {
    setRefreshTokenInDatabase,
    insertUserIntoDatabase
}