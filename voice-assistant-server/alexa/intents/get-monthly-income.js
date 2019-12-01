const fetch = require("node-fetch");
const APP_ENV = require("../../env"); // application environment variables
const URL = `${APP_ENV.backendUrl}/metrics/all`;
const months = require('./months')



module.exports = async (req, res) => {
  const slots = req.body.request.intent.slots;
  console.log("===> GET MONTHLY INCOME", slots);

  let totalURL =  `${URL}/${global.username}/M/${months.mapping[slots.month.value]}/0/${slots.year.value}` //`${URL}/${global.username}/M/${slots.time.value.slice(
    // -2)}/0/${Number(slots.time.value.substring(0, 4)) - 1}`;

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
          ssml: `<speak>Your monthly income for ${slots.month.value} ${slots.year.value}  is $${results.totalIncome} </speak>`
        }
      }
      })
          }
        });
};
