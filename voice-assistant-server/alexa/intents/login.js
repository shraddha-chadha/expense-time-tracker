const APP_ENV = require('../../env');                       // application environment variables
const tokenService =require('../../token-service');         // token service
const URL = APP_ENV.backendUrl + '/authenticateVpa'; 
      // BACKEND API URL
// const token = require('./token'); 
var fs = require('fs');  

module.exports = async (req, res) => {
    const slots = req.body.request.intent.slots;
    console.log("===> LOGIN", slots);

    const response = await tokenService.getAmazonToken(slots.username.value).then(async (response) => {
      const results = await response.json();
      if(results.status === 404) {
        console.log("ErrorResults", results);

      } else {
        console.log("Results", results);
        global.token = results.token
        global.username = results.username
//         fs.writeFile('./token.js', `{ token: ${results.token}, username:${results.username}}`
// , function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

        // APP_ENV.token = results.token
        // APP_ENV.username = results.username
        console.log(APP_ENV)
        // window.localStorage.setItem("webToken",results.token);
        // window.localStorage.setItem("username",results.username);
        // setRedirect(true);
      }
    });


    
    // const tokenResponse = await tokenService.getAmazonToken(slots.username.value);
    // console.log("the response**********", tokenResponse.json())
    // token.token = tokenResponse.json().token
    // token.username = tokenResponse.json().username
    // console.log(token)

    /*const url = APP_ENV.backendUrl;
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
    const results = await fetch(url, options);
    */
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>You've logged in</speak>"
                }
            }
        }
    );
};