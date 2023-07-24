const pool = require("../config/mysql");

async function deleteUserFromDataBase(username) {
    const query = "DELETE FROM User WHERE username = ?";
    const params = [username];
    try {
        await pool.query(query, params);
        return `Deleted ${username} from database`;
    } catch (error) {
        console.error('Error during delete:', error);
        return 'Error when deleting user from the database';
    }
}

async function getUsers() {
    const query = "SELECT User.username, Vlan.name FROM User INNER JOIN Vlan ON User.id = Vlan.user_id";
    const [users] = await pool.query(query);
    return users;
}
module.exports = {
    getUsers,
    deleteUserFromDataBase
}