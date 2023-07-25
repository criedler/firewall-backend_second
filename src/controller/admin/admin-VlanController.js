const {makeRequest} = require("../../services/requestAPIService");
const vlanService = require("../../services/vlanService");


async function getAllVlans(req, res) {
    const vlans = await makeRequest('/rest/config/v1/box/network/vlans');
    console.log(vlans.items);
    const arrayOfVlans = vlans.items;
    const response = [];

    for (let count in arrayOfVlans) {
        const vlan = await makeRequest('/rest/config/v1/box/network/vlans/' + arrayOfVlans[count]);
        response.push(vlan);
    }

    return res.send(response);

}

async function createVlan(req, res) {
    const method = 'POST';
    const body = JSON.stringify(req.body);
    const url = '/rest/config/v1/box/network/vlans';
    const response = await makeRequest(url, method, body);

    const vlanName = JSON.parse(body).name;
    console.log(vlanName);

    const message = await vlanService.insertVlanIntoDatabase(vlanName);

    return res.json({firewallResponse: response, databaseResponse: message});
}

async function updateVlan(req, res) {
    const method = 'POST';
    const body = JSON.stringify(req.body);
    const url = '/rest/config/v1/box/network/vlans';
    const response = await makeRequest(url, method, body);

    const vlanName = JSON.parse(body).name;
    console.log(vlanName);

    const message = await vlanService.updateVlanInDatabase(vlanName);

    return res.json({firewallResponse: response, databaseResponse: message});
}

async function deleteVlan(req, res) {
    const method = 'DELETE';
    const url = '/rest/config/v1/box/network/vlans';
    const vlanName = req.params.name;

    const response = await makeRequest(url+'/'+vlanName, method);

    const message = await vlanService.deleteVlanFromDatabase(vlanName);

    return res.json({firewallResponse: response, databaseResponse: message});
}

async function assignVlan(req, res) {
    const username = req.body.username;
    const vlan = req.body.vlanName;

    const message = await vlanService.assignUserToVlan(username, vlan);

    res.send(message);
}

module.exports = {
    getAllVlans,
    createVlan,
    updateVlan,
    deleteVlan,
    assignVlan
};