const fetch = require("node-fetch");
const APP_ENV = require('../../env');             // application environment variables
const URL = `${APP_ENV.backendUrl}/expense`;


module.exports = async (req, res) => {
  const slots = req.body.request.intent.slots;
  console.log("===> ADD EXPENSE", slots);

  let totalURL = `${URL}/${global.username}/1`;

  const API_PARAMS = {
        "transactionDate":slots.time.value,
        "transactionType": "Expense",
        "transactionCategory": slots.class.value,
        "name": "",
        "amount": slots.dollars.value,
        "isoCurrencyCode": "USD",
        "unofficialCurrencyCode": "",
        "location":"",
        "month":"",
        "year":"",
        "quarter":"",
        "day":"",
        "isManuallyInserted":""
}
  console.log(API_PARAMS)

  const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${global.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(API_PARAMS)
      };

  const response = await fetch(totalURL, options).then(async (response) => {
    var results = await response.json();
    if(results.status === 404) {
      console.log("ErrorResults", results);
    } else {
      console.log("Totals Results", results);  
      return res.send({
      version: "1.0",
      response: {
        outputSpeech: {
          type: "SSML",
          ssml: `<speak>Your expense has been added</speak>`
        }
      }
      })
          }
        });
};