const pool = require("../config/mysql");

async function getUsersFromDatabase() {
    const query = "SELECT User.id, User.username, Vlan.name FROM User INNER JOIN Vlan ON User.id = Vlan.user_id";
    try {
        const [users] = await pool.query(query);
        console.log(users);
        return users;
    } catch (error) {
        console.error('Error during SELECT:', error);
        return {status: 500, statusText: 'Internal Server Error'};
    }
}

async function deleteUserFromDataBase(username) {
    const query = "DELETE FROM User WHERE username = ?";
    const params = [username];
    try {
        const [result] = await pool.query(query, params);
        if (result.affectedRows === 0) {
            return {status: 404, message: 'User not found in the database'};
        } else {
            return {status: 200, message: 'User deleted'};
        }
    } catch (error) {
        console.error('Error during DELETE:', error);
        return {status: 500, statusText: 'Internal Server Error'};
    }
}


module.exports = {
    getUsersFromDatabase,
    deleteUserFromDataBase
}