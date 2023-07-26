const {makeRequest} = require("../../services/requestAPIService");
const vlanService = require("../../services/vlanService");


async function getAllVlans(req, res) {
    const vlans = await makeRequest('/rest/config/v1/box/network/vlans');
    const arrayOfVlans = vlans.items;
    const response = [];

    for (let count in arrayOfVlans) {
        const vlan = await makeRequest('/rest/config/v1/box/network/vlans/' + arrayOfVlans[count]);
        response.push(vlan);
    }
    return res.json(response);

}

async function createVlan(req, res) {
    const method = 'POST';
    const body = JSON.stringify(req.body);
    const url = '/rest/config/v1/box/network/vlans';
    const firewallResponse = await makeRequest(url, method, body);

    const vlanName = JSON.parse(body).name;

    const dataBaseResponse = await vlanService.insertVlanIntoDatabase(vlanName);

    return res.json({success: true, message: {firewallResponse, dataBaseResponse}});
}

async function updateVlan(req, res) {
    const method = 'POST';
    const body = JSON.stringify(req.body);
    const url = '/rest/config/v1/box/network/vlans';
    const firewallResponse = await makeRequest(url, method, body);

    const currentVlanName = req.params.name;
    const newVlanName = JSON.parse(body).name;

    const dataBaseResponse = await vlanService.updateVlanInDatabase(currentVlanName, newVlanName);

    return res.json({success: true, message: {firewallResponse, dataBaseResponse}});
}

async function deleteVlan(req, res) {
    const method = 'DELETE';
    const url = '/rest/config/v1/box/network/vlans';
    const vlanName = req.params.name;

    const firewallResponse = await makeRequest(url + '/' + vlanName, method);

    const dataBaseResponse = await vlanService.deleteVlanFromDatabase(vlanName);

    return res.json({success: true, message: {firewallResponse, dataBaseResponse}});
}

async function assignVlan(req, res) {
    const username = req.body.username;
    const vlan = req.params.name;

    const message = await vlanService.assignUserToVlan(username, vlan);
    if (message.status === 200) {
        res.status(200).json({success: true, message: message});
    } else {
        res.status(500).json({success: false, message: message});
    }
}

module.exports = {
    getAllVlans,
    createVlan,
    updateVlan,
    deleteVlan,
    assignVlan
};