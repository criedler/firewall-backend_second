const {makeRequest} = require("../../services/requestAPIService");

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

module.exports = {
    getAllVlans,
    createVlan,
    updateVlan,
    deleteVlan
}