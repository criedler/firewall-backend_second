const {makeRequest} = require("../../services/requestAPIService");


async function getRulesInList(req, res) {
    console.log(req.params.list+'controller');
    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/lists/' + req.params.list);
    res.send(response);
}

async function createRuleInList(req, res) {
    const method = 'POST';
    const url = '/rest/config/v1/forwarding-firewall/rules/lists/' + req.params.list
    let requestData = JSON.stringify(req.body);

    const response = await makeRequest(url, method, requestData);
    res.send(response);
}

async function modifyRuleInList(req, res) {
    const method = 'PATCH';
    const url = '/rest/config/v1/forwarding-firewall/rules/lists/' + req.params.list + '/' + req.params.rule;
    const requestData = JSON.stringify(req.body)

    const response = await makeRequest(url, method, requestData);
    res.send(response);
}

async function deleteRuleInList(req, res) {
    const method = 'DELETE';
    const url = '/rest/config/v1/forwarding-firewall/rules/lists/' + req.params.list + '/' + req.params.rule;

    const response = await makeRequest(url, method);
    res.send(response);
}

module.exports = {
    getRulesInList,
    createRuleInList,
    deleteRuleInList,
    modifyRuleInList
}