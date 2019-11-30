const fetch = require("node-fetch");
const APP_ENV = require('../../env');             // application environment variables
const URL = `${APP_ENV.backendUrl}/metrics/all`;


module.exports = async (req, res) => {
  const slots = req.body.request.intent.slots;
  console.log("===> GET YEARLY EXPENSE ksdnksa", slots);

  let totalURL = `${URL}/${global.username}/Y/0/0/${slots.year.value}`;

  const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${global.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
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
          ssml: `<speak>Your yearly expense for ${slots.year.value} is $${results.totalExpense} </speak>`
        }
      }
      })
          }
        });
};