const APP_ENV = require('../../env');                       // application environment variables
const tokenService =require('../../token-service');         // token service
const URL = APP_ENV.backendUrl + '/last-transaction';       // BACKEND API URL

module.exports = async (req, res) => {
    const slots = req.body.request.intent.slots;
    console.log("===> GET LAST TRANSACTIONmmmmm", slots);
    /*
    const tokenResponse = await tokenService.getAmazonToken();
    const API_PARAMS = {
        month: slots.month.value,
        year: slots.year.value
    };
    const options = {
        header: {
            'Authorization': 'Bearer ' + tokenResponse.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(API_PARAMS)
    };
    const results = await fetch(URL, options);
    */
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Your last transaction was $4500.</speak>"
                }
            }
        }
    );
};