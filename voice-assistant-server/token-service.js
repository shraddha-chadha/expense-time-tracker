const APP_ENV = require('./env');
module.exports = {
    getAmazonToken: async (amazonId) => {
        const URL = APP_ENV.backendUrl;
        const OPTIONS = {
            method: 'GET',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "id": amazonId,
                "type": "AMAZON"
            })
        };
        const results = await fetch(URL, OPTIONS);
        return results;
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