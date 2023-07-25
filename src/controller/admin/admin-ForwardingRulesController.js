const {makeRequest} = require("../../services/requestAPIService");

async function getRules(req, res) {
    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules');
    res.json(response);
}

async function getRuleLists(req, res) {
    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/lists');
    res.json(response);
}

async function createRule(req, res) {
    const method = 'POST';
    let requestData = JSON.stringify(req.body);

    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules', method, requestData);
    res.json(response);
}

async function createList(req, res) {
    const method = 'POST';
    const requestData = JSON.stringify(req.body);

    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/lists', method, requestData);
    res.json(response);
}

async function deleteRule(req, res) {
    const method = 'DELETE';
    const rule = req.params.rule;

    const response = await makeRequest(`/rest/config/v1/forwarding-firewall/rules/${rule}`, method);

    res.json(response);
}

async function deleteList(req,res) {
    const method = 'DELETE';

    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/lists/'+req.params.list, method);
    res.json(response);
}
async function modifyRule(req,res) {
    const method = 'PATCH';
    const requestData = JSON.stringify(req.body);
    const rule = req.params.rule;

    const response = await makeRequest(`/rest/config/v1/forwarding-firewall/rules/${rule}`, method, requestData);
    res.json(response);
}

module.exports= {
    getRules,
    getRuleLists,
    createRule,
    createList,
    deleteRule,
    deleteList,
    modifyRule
};