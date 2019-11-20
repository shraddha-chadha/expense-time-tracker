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
    switch(request_type) {
        case 'LaunchRequest': 
            handleLaunchRequest(res);
            break;
        case 'IntentRequest':
            handleTransactionIntent(res);
            break;
    }

//     if(request_type === 'LaunchRequest') {
//             handleLaunchRequest(res);
//     }
//     else if (request_type === 'IntentRequest'){
//         let request_intent = req.body.request.intent.name
//         switch(request_intent){
//             case 'LastTransaction':
//                 handleTransactionIntent(res);
//                 break;
//             case 'AddExpense':
//                 handleAddExpenseIntent(res);
//                 break;
//             case 'AddBudget':
//                 handleAddBudgetIntent(res);
//                 break;
//             case 'AddIncome':
//                 handleAddIncomeIntent(res);
//                 break;
//             case 'AddCategory':
//                 handleAddCategoryIntent(res);
//                 break;
//             case 'GetExpense':
//                 handleGetExpenseIntent(res);
//                 break;
//             case 'GetBudget':
//                 handleGetBudgetIntent(res);
//                 break;
//             case 'GetIncome':
//                 handleGetIncomeIntent(res);
//                 break;
//             case 'GetSaving':
//                 handleGetSavingIntent(res);
//                 break;
//             case 'GetBalance':
//                 handleGetBalanceIntent(res);
//                 break;
//         }
//     }
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

function handleAddExpenseIntent(res) {

    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside Add Expense</speak>"
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

function handleAddBudgetIntent(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside Add Budget</speak>"
            }
        }
    }
    )
}

function handleAddIncomeIntent(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside Add Income</speak>"
            }
        }
    }
    )
}

function handleAddCategoryIntent(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside Add Category</speak>"
            }
        }
    }
    )
}

function handleGetExpenseIntent(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside get expense</speak>"
            }
        }
    }
    )
}

function handleGetBudgetIntent(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside get budget</speak>"
            }
        }
    }
    )
}

function handleGetIncomeIntent(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside get income</speak>"
            }
        }
    }
    )
}

function handleGetSavingIntent(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside get savings</speak>"
            }
        }
    }
    )
}

function handleGetBalanceIntent(res) {
    return res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Inside get balance</speak>"
            }
        }
    }
    )
}

app.post('/google', googleHome);


app.listen(port, () => console.log('Voice Assistant Server listening on port 3001!'));
