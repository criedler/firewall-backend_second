const pool = require("../../config/mysql");

async function getUsers (req, res ) {
    const query = "SELECT User.username, Vlan.name FROM User INNER JOIN Vlan ON User.id = Vlan.user_id";
    const [users] = await pool.query(query);
    res.json(users);
}

async function deleteUser (req, res) {
    const query = "DELETE FROM User WHERE username = ?";
    const params = [req.params.username];
    console.log(req.params.username);
    try {
        await console.log(await pool.query(query, params));
        res.send(`Deleted ${req.params.username} from database`);
    } catch (error) {
        return res.send('Error when deleting user from the database');
    }
}



module.exports = {
    getUsers,
    deleteUser
}