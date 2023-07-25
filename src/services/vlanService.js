// vlanService.js

const pool = require("../config/mysql");

async function insertVlanIntoDatabase(vlanName) {
    const query = "INSERT INTO Vlan (name) VALUES (?)";
    const params = [vlanName];
    try {
        await pool.query(query, params);
        return `Inserted ${vlanName} into the database`;
    } catch (error) {
        console.log('Error during insert:', error);
        return 'Error when assigning vlan to user in the database';
    }
}

async function updateVlanInDatabase(vlanName, vlan) {
    const query = "UPDATE Vlan SET name = ? WHERE name= ?";
    const params = [vlanName, vlan];
    try {
        await pool.query(query, params);
        return `Updated ${vlanName} in the database`;
    } catch (error) {
        console.log('Error during update:', error);
        return 'Error when updating vlan in the database';
    }
}

async function deleteVlanFromDatabase(vlanName) {
    const query = "DELETE FROM Vlan WHERE name= ?";
    const params = [vlanName];
    try {
        await pool.query(query, params);
        return `Deleted ${vlanName} from the database`;
    } catch (error) {
        console.log('Error during delete:', error);
        return 'Error when deleting vlan from the database';
    }
}

async function assignUserToVlan(username, vlan) {
    const queryId = "SELECT User.id FROM User WHERE username = ?";
    const usernameParam = [username];

    try {
        const [result] = await pool.query(queryId, usernameParam);
        console.log(result);
        if (result.length === 0) {
            return {status: 404, message: 'User not found in the database'};
        }
        const userId = result[0].id;
        const query = "UPDATE Vlan SET user_id = ? WHERE name= ?";
        const params = [userId, vlan];
        await pool.query(query, params);
        return {status: 200, message: `Assigned user ${username} to ${vlan}`};
    } catch (error) {
        console.log('Error during assign:', error);
        return {status: 500, statusText: 'Internal Server Error'};
    }


}

module.exports = {
    insertVlanIntoDatabase,
    updateVlanInDatabase,
    deleteVlanFromDatabase,
    assignUserToVlan
};
