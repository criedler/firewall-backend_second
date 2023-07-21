const {makeRequest} = require("../../services/requestAPIService");
const pool = require("../../config/mysql");

async function getAllVlans(req, res) {
    const vlans = await makeRequest('/rest/config/v1/box/network/vlans');
    const arrayOfVlans = JSON.parse(vlans).items;
    const response = [];

    for (let count in arrayOfVlans) {
        const vlan = await makeRequest('/rest/config/v1/box/network/vlans/' + arrayOfVlans[count]);
        response.push(JSON.parse(vlan));
    }

    return res.send(response);

}

async function createVlan(req, res) {
    const method = 'POST';
    const body = JSON.stringify(req.body);
    const url = '/rest/config/v1/box/network/vlans';
    const response = await makeRequest(url, method, body);

    const vlanName = body.name
    const query = "INSERT INTO Vlan (name) VALUES (?)";
    const params = [vlanName];
    try {
        await pool.query(query, params);
        res.send(`Inserted ${vlanName} into database`);
    } catch (error) {
        return 'Error when assigning vlan to user in the database';
    }

    return res.send(response)
}

async function updateVlan(req, res) {
    const method = 'PUT';
    const body = JSON.stringify(req.body);
    const url = '/rest/config/v1/box/network/vlans'

    const response = await makeRequest(url, method, body);
    res.send(response);
}

async function deleteVlan(req, res) {
    const method = 'DELETE';
    const url = '/rest/config/v1/box/network/vlans';

    const response = await makeRequest(url, method);
    res.send(response);
}

async function assignVlan(req, res) {
    const username = req.body.username;
    const vlan = req.body.vlan;

    const query = "UPDATE Vlan SET user_id = ? WHERE vlan= ?";
    const params = [username, vlan];
    try {
        await pool.query(query, params);
        res.send(`Assigned user ${username} to ${vlan}`);
    } catch (error) {
        return 'Error when assigning vlan to user in the database';
    }

}

module.exports = {
    getAllVlans,
    createVlan,
    updateVlan,
    deleteVlan,
    assignVlan
};