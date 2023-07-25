const {makeRequest} = require("../../services/requestAPIService");

async function getRules (req, res ) {
    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules');
    res.send(response);
}

async function getRuleLists (req, res ) {
    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/lists');
    res.send(response);
}

async function createRule(req, res) {
    const method = 'POST';
    let requestData = JSON.stringify(req.body);

    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules', method, requestData);
    res.send(response);
}

async function createList(req, res) {
    const method = 'POST';
    const requestData = JSON.stringify(req.body);


    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/lists', method, requestData);
    res.send(response);
}

 async function deleteRule(req,res) {
    const method = 'DELETE';

    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/'+req.params.rule, method);
    res.send(response);
}

async function deleteList(req,res) {
    const method = 'DELETE';

    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/lists/'+req.params.list, method);
    res.send(response);
}
async function modifyRule(req,res) {
    const method = 'PATCH';
    let requestData = JSON.stringify(req.body);

    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules', method, requestData);
    res.send(response);
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