const APP_ENV = require('../../env');                       // application environment variables
const tokenService =require('../../token-service');         // token service
const fetch = require('node-fetch');                        // fetch alternate for node

module.exports = async (req, res) => {
    const slots = req.body.request.intent.slots;
    console.log("===> GET YEARLY EXPENSESS", slots);
    const tokenResponse = await tokenService.getAmazonToken(req.body.session.user.userId).catch((e) => { console.log(e) });
    console.log("TOKEN", tokenResponse);
    const token = await tokenResponse.json();
    
    // const url = APP_ENV.backendUrl + '/';
    // const API_PARAMS = {
    //     year: slots.year.value
    // };
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'Bearer ' + tokenResponse.token,
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(API_PARAMS)
    // };
    // const results = await fetch(url, options);
    // console.log("RESULTS", await results.json());
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Your yearly expense for TEST was $4590.</speak>"
                }
            }
        }
    );
};