const APP_ENV = require('../../env');                       // application environment variables
const tokenService =require('../../token-service');         // token service
const URL = APP_ENV.backendUrl + '/last-transaction';       // BACKEND API URL
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const slots = req.body.request.intent.slots;
    console.log("===> GET YEARLY EXPENSE", slots);
    const tokenResponse = await tokenService.getAmazonToken(req.body.session.user.userId);
    const token = await tokenResponse.json();
    console.log(token);
    const url = APP_ENV.backendUrl;
    const API_PARAMS = {
        year: slots.year.value
    };
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenResponse.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(API_PARAMS)
    };
    const results = await fetch(URL, options);
    console.log("RESULTS", results);
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Your yearly expense for " + results + " was $4590.</speak>"
                }
            }
        }
    );
};