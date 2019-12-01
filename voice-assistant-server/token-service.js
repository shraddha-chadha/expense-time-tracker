const APP_ENV = require('./env');
const fetch = require('node-fetch');
module.exports = {
    getAmazonToken: async (amazonId) => {
        const URL = APP_ENV.backendUrl + `/user/authenticateVpa?username=${amazonId}`; //vpaIndicator=amazon&token=gygy;
        const OPTIONS = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };
        console.log(URL);
        return fetch(URL, OPTIONS);
    },
    getGoogleToken: async (googleId) => {
        const URL = APP_ENV.backendUrl;
        const OPTIONS = {
            method: 'GET',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "id": googleId,
                "type": "GOOGLE"
            })
        };
        const results = await fetch(URL, OPTIONS);
        return results;
    }
};