const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const axios = require('axios');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.post('/', (req, res) => {
    let request_type = req.body.request.type
    console.log("Request Type", request_type);
    switch(request_type) {
        case 'LaunchRequest': 
            handleLaunchRequest(res);
            break;
        case 'IntentRequest':
            handleTransactionIntent(res);
            break;
    }
});

function handleLaunchRequest(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Welcome to CashClock. You can now manage all your daily Expenses and Time</speak>"
            }
        }
    }
    )
}

function handleTransactionIntent(response) {
    axios.post('http://localhost:8080/transactions').then((res) => {
        let transactions = res.data.transactions;
        let date = transactions[0].date;
        let name =transactions[0].name;
        let amount = transactions[0].amount;
        let currency = transactions[0].isoCurrencyCode;
        return response.send({
            "version": "1.0",
            "response": {
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": `<speak>Your last transaction was of ${amount} ${currency} at ${name} on ${date}</speak>`
                }
            }
        }
        )
    });
    
}
app.listen(3000, () => console.log('Example app listening on port 3000!'));
