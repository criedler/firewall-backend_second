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

    try {
        const response = await fetch(preUrl + url + endUrl, {
            method: method,
            body: body,
            headers: headers,
        });

        const responseBody = await response.text();

        if (responseBody.length === 0) {
            return ({status: response.status, statusText: response.statusText});
        } else {
            return JSON.parse(responseBody);
        }
    } catch (error) {
        console.error('Error during API request to Firewall:', error);
        return {status:500,message:'An error occurred when trying to reach the Firewall API'};
    }
}

module.exports = {
    makeRequest
};
