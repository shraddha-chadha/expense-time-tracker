const fetch = require("node-fetch");
const APP_ENV = require('../../env');           // application environment variables
const URL = `${APP_ENV.backendUrl}/metrics/expensesByCategory`;      // BACKEND API URL
const months = require('./months')

module.exports = async (req, res) => {
  const slots = req.body.request.intent.slots;
  console.log("===> GET MONTHLY TOP CATEGORY", slots);

//   http://localhost:8080/metrics/expensesByCategory/Mahitee/M/11/0/2019

  let totalURL = `${URL}/${global.username}/M/${months.mapping[slots.month.value]}/0/${slots.year.value}`;

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
      var maxKey = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);
    //   var maxKey = _.max(Object.keys(results), o => results[o]);
      return res.send({
      version: "1.0",
      response: {
        outputSpeech: {
          type: "SSML",
          ssml: `<speak>Your top spending category for ${slots.month.value} ${slots.year.value} is ${maxKey} with amount $${results[maxKey]} </speak>`
        }
      }
      })
          }
        });
};