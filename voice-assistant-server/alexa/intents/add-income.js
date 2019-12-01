const fetch = require("node-fetch");
const APP_ENV = require('../../env');             // application environment variables
const URL = `${APP_ENV.backendUrl}/addTransaction`;
const months = require('./months')


module.exports = async (req, res) => {
  const slots = req.body.request.intent.slots;
  console.log("===> ADD INCOME", slots);

  let totalURL = `${URL}/${global.username}/Income/M/?amount=${slots.dollars.value}&day=0&month=${months.mapping[slots.month.value]}&year=${slots.year.value}&quarter=0`;
  console.log(totalURL)

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
          ssml: `<speak>Your income for ${slots.month.value} ${slots.year.value} has been added</speak>`
        }
      }
      })
          }
        });
};