process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function makeRequest(url, method = 'GET', body = null, customHeaders = {}) {
    const token = process.env.API_TOKEN;
    const preUrl = process.env.MANAGEMENT_IP;
    const endUrl = '?envelop=true&expand=true'
    const defaultHeaders = {
        'X-API-TOKEN': token,
        'Content-Type': 'application/json'
    };
    const headers = {
        ...defaultHeaders,
        ...customHeaders
    };

    const response = await fetch(preUrl + url + endUrl, {
        method: method,
        body: body,
        headers: headers,
    });

    return await response.text();
}


module.exports = {
    makeRequest
};
