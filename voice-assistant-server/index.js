const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const axios = require('axios');
const port = 3001;
const googleHome = require('./google_home');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

// Welcome Page
app.get('/', (req, res) => {
    res.send("Welcome to the Voice Personal Assistant Server")
});

// API where all Alexa request comes
app.post('/', (req, res) => {
    let request_type = req.body.request.type
    console.log("Request Body", req.body);
    // console.log("Request Type", request_type);
    // switch(request_type) {
    //     case 'LaunchRequest': 
    //         handleLaunchRequest(res);
    //         break;
    //     case 'IntentRequest':
    //         handleTransactionIntent(res);
    //         break;
    // }

    if(request_type === 'LaunchRequest') {
            handleLaunchRequest(res);
    }
    else if (request_type === 'IntentRequest'){
        let request_intent = req.body.request.intent.name
        switch(request_intent){
            case 'LastTransaction':
                handleTransactionIntent(res);
                break;
            case 'AddExpense':
                handleAddExpenseIntent(req, res);
                break;
            case 'AddBudget':
                handleAddBudgetIntent(req, res);
                break;
            case 'AddIncome':
                handleAddIncomeIntent(req, res);
                break;
            case 'AddCategory':
                handleAddCategoryIntent(req, res);
                break;
            case 'GetExpense':
                handleGetExpenseIntent(req, res);
                break;
            case 'GetBudget':
                handleGetBudgetIntent(req, res);
                break;
            case 'GetIncome':
                handleGetIncomeIntent(req, res);
                break;
            case 'GetSaving':
                handleGetSavingIntent(req, res);
                break;
            case 'GetBalance':
                handleGetBalanceIntent(req, res);
                break;
            case 'GetTopCategories':
                handleGetTopCategoriesIntent(req, res);
                break;
        }
    }
});

function handleLaunchRequest(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Welcome to Cash Clock. How can I assist you today?</speak>"
            }
        }
    }
    )
}

function handleAddExpenseIntent(req, res) {
    console.log('Inside add expense')
    console.log(req.body.request.intent.slots)
    var dollar = req.body.request.intent.slots['dollars']['value'];
    var cents = req.body.request.intent.slots['cents']['value'];
    amount = parseFloat(dollar.toString() + '.' + cents.toString())
    console.log(typeof(amount))
    var date = req.body.request.intent.slots['time']['value'];
    var category = req.body.request.intent.slots['class']['value'];
    console.log('********************************')
    console.log(amount, date, category)
    console.log('********************************')
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>The amount has been added to your expenses</speak>"
            }
        }
    }
    )
}

function handleTransactionIntent(response) {

    return response.send({
            "version": "1.0",
            "response": {
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": `<speak>Your last transaction was of $5</speak>`
                }
            }
        }
        )

    // axios.post('http://localhost:8080/transactions').then((res) => {
    //     let transactions = res.data.transactions;
    //     let date = transactions[0].date;
    //     let name =transactions[0].name;
    //     let amount = transactions[0].amount;
    //     let currency = transactions[0].isoCurrencyCode;
    //     return response.send({
    //         "version": "1.0",
    //         "response": {
    //             "outputSpeech": {
    //                 "type": "SSML",
    //                 "ssml": `<speak>Your last transaction was of ${amount} ${currency} at ${name} on ${date}</speak>`
    //             }
    //         }
    //     }
    //     )
    // });
    
}

function handleAddBudgetIntent(req, res) {
    console.log('Inside add budget')
    console.log(req.body.request.intent.slots)
    let dollars = req.body.request.intent.slots['dollars']['value'];
    let date = req.body.request.intent.slots['mon']['value'];
    let category = req.body.request.intent.slots['class']['value'];
    console.log('********************************')
    console.log(dollars, date, category)
    console.log('********************************')
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": `<speak>Your budget for ${category} has been set </speak>`
            }
        }
    }
    )
}

function handleAddIncomeIntent(req, res) {
    console.log('Inside add income')
    console.log(req.body.request.intent.slots)
    let dollars = req.body.request.intent.slots['dollars']['value'];
    let date = req.body.request.intent.slots['time']['value'];
    console.log('********************************')
    console.log(dollars, date)
    console.log('********************************')
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Your income has been added</speak>"
            }
        }
    }
    )
}

function handleAddCategoryIntent(req, res) {
    console.log('Inside add category')
    console.log(req.body.request.intent.slots)
    let category = req.body.request.intent.slots['class']['value'];
    console.log('********************************')
    console.log(category)
    console.log('********************************')
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": `<speak>Your new spending category ${category} has been created</speak>`
            }
        }
    }
    )
}

function handleGetExpenseIntent(req, res) {
    console.log('Inside get expense')
    console.log(req.body.request.intent.slots)
    let month = req.body.request.intent.slots['mon']['value'];
    console.log('********************************')
    console.log(month)
    console.log('********************************')
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": `<speak>Your spending for ${month} is </speak>`
            }
        }
    }
    )
}

function handleGetBudgetIntent(req, res) {
    console.log('Inside get budget')
    console.log(req.body.request.intent.slots)
    let month = req.body.request.intent.slots['mon']['value'];
    console.log('********************************')
    console.log(month)
    console.log('********************************')
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": `<speak>Your budget for ${month} is </speak>`
            }
        }
    }
    )
}

function handleGetIncomeIntent(req, res) {
    console.log('Inside get income')
    console.log(req.body.request.intent.slots)
    let month = req.body.request.intent.slots['mon']['value'];
    console.log('********************************')
    console.log(month)
    console.log('********************************')
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": `<speak>Your income for ${month} is </speak>`
            }
        }
    }
    )
}

function handleGetSavingIntent(req, res) {
    console.log('Inside get savings')
    console.log(req.body.request.intent.slots)
    let month = req.body.request.intent.slots['mon']['value'];
    console.log('********************************')
    console.log(month)
    console.log('********************************')
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": `<speak>Your savings for ${month} is </speak>`
            }
        }
    }
    )
}

function handleGetBalanceIntent(req, res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Your current balance is </speak>"
            }
        }
    }
    )
}

function handleGetTopCategoriesIntent(req, res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Your top categories are </speak>"
            }
        }
    }
    )
}

app.post('/google', googleHome);
function handleGetTopCategoriesIntent(req, res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Your top categories are</speak>"
            }
        }
    }
    )
}

app.listen(port, () => console.log('Voice Assistant Server listening on port 3001!'));