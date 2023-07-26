// vlanService.js

const pool = require("../config/mysql");

async function insertVlanIntoDatabase(vlanName) {
    const query = "INSERT INTO Vlan (name) VALUES (?)";
    const params = [vlanName];
    try {
        await pool.query(query, params);
        return {status:200,message:`Inserted ${vlanName} into the database`};
    } catch (error) {
        console.error('Error during insert:', error);
        return {status:500,message:`Error when inserting ${vlanName} into the database`};
    }
}

async function updateVlanInDatabase( currentVlanName,newVlanName) {
    const query = "UPDATE Vlan SET name = ? WHERE name= ?";
    const params = [newVlanName, currentVlanName];
    try {
        await pool.query(query, params);
        return {status:200,message:`Updated ${currentVlanName} to ${newVlanName} in the database`};
    } catch (error) {
        console.error('Error during update:', error);
        return {status:500,message:`Error when updating ${currentVlanName} to ${newVlanName} in the database`}
    }
}

async function deleteVlanFromDatabase(vlanName) {
    const query = "DELETE FROM Vlan WHERE name= ?";
    const params = [vlanName];
    try {
        await pool.query(query, params);
        return {status:200, message:`Deleted ${vlanName} from the database`};
    } catch (error) {
        console.error('Error during delete:', error);
        return {status:500, message:`Error when deleting ${vlanName} from the database`};
    }
}

async function assignUserToVlan(username, vlan) {
    const queryId = "SELECT User.id FROM User WHERE username = ?";
    const usernameParam = [username];

    try {
        const [result] = await pool.query(queryId, usernameParam);
        if (result.length === 0) {
            return {status: 404, message: 'User not found in the database'};
        }
        const userId = result[0].id;
        const query = "UPDATE Vlan SET user_id = ? WHERE name= ?";
        const params = [userId, vlan];
        await pool.query(query, params);
        return {status: 200, message: `Assigned user ${username} to ${vlan}`};
    } catch (error) {
        console.error('Error during assign:', error);
        return {status: 500, statusText: 'Internal Server Error'};
    }

}

module.exports = {
    insertVlanIntoDatabase,
    updateVlanInDatabase,
    deleteVlanFromDatabase,
    assignUserToVlan
};
