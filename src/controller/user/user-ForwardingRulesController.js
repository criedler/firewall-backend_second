const {makeRequest} = require("../../services/requestAPIService");


async function getRulesInList(req, res) {
    const response = await makeRequest('/rest/config/v1/forwarding-firewall/rules/lists/' + req.params.list);
    res.send(response);
}

async function createRuleInList(req, res) {
    const method = 'POST';
    const url = '/rest/config/v1/forwarding-firewall/rules/lists/' + req.params.list;

    try {
        const requestData = JSON.stringify(req.body);
        JSON.parse(requestData);
        const response = await makeRequest(url, method, requestData);
        if (response.status >= 200 && response.status < 300) {
            res.status(200).json({success: true, message: response});
        } else {
            res.status(400).json({success: false, message: response});
        }
    } catch (error) {
        console.error('Invalid JSON input', error);
        res.status(400).json({success: false, message: 'Bad request'});
    }
}

async function modifyRuleInList(req, res) {
    const method = 'PATCH';
    const url = '/rest/config/v1/forwarding-firewall/rules/lists/' + req.params.list + '/' + req.params.rule;
    try {
        const requestData = JSON.stringify(req.body);
        JSON.parse(requestData);
        const response = await makeRequest(url, method, requestData);
        if (response.status >= 200 && response.status < 300) {
            res.status(200).json({success: true, message: response});
        } else {
            res.status(400).json({success: false, message: response});
        }
    } catch (error) {
        console.error('Invalid JSON input', error);
        res.status(400).json({success: false, message: 'Bad request'});
    }
}

async function deleteRuleInList(req, res) {
    const method = 'DELETE';
    const url = '/rest/config/v1/forwarding-firewall/rules/lists/' + req.params.list + '/' + req.params.rule;


    const response = await makeRequest(url, method);
    if (response.status >= 200 && response.status < 300) {
        res.status(200).json({success: true, message: response});
    } else {
        res.status(400).json({success: false, message: response});
    }
}

module.exports = {
    getRulesInList,
    createRuleInList,
    deleteRuleInList,
    modifyRuleInList
}