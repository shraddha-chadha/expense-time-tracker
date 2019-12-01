const IntentHandler = require('./intents');

module.exports = (req, res) => {
    let requestType = req.body.request.type
    if (requestType === 'LaunchRequest') {
        res.send({
            "version": "1.0",
            "response": {
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": "<speak>Welcome to Cash Clock. How can I assist you today?</speak>"
                }
            }
        });
    }
    else if (requestType === 'IntentRequest'){
        const intentType = req.body.request.intent.name;
        switch (intentType) {

            case 'Login':
                IntentHandler.login(req, res);
                break;

            // INCOME BY MONTH / QUARTER / YEAR
            case 'GetMonthlyIncome':
                IntentHandler.getMonthlyIncome(req, res);
                break;

            case 'GetQuarterlyIncome':
                IntentHandler.getQuarterlyIncome(req, res);
                break;

            case 'GetYearlyIncome':
                console.log('here')
                IntentHandler.getYearlyIncome(req, res);
                break;

            // SAVINGS BY MONTH / QUARTER / YEAR
            case 'GetMonthlySavings':
                IntentHandler.getMonthlySavings(req, res);
                break;

            case 'GetQuarterlySavings':
                IntentHandler.getQuarterlySavings(req, res);
                break;

            case 'GetYearlySavings':
                IntentHandler.getYearlySavings(req, res);
                break;

            // EXPENSES BY MONTH / QUARTER / YEAR
            case 'GetMonthlyExpense':
                IntentHandler.getMonthlyExpense(req, res);
                break;

            case 'GetQuarterlyExpense':
                IntentHandler.getQuarterlyExpense(req, res);
                break;

            case 'GetYearlyExpense':
                IntentHandler.getYearlyExpense(req, res);
                break;

            // BUDGET BY MONTH / QUARTER / YEAR
            case 'GetMonthlyBudget':
                IntentHandler.getMonthlyBudget(req, res);
                break;

            case 'GetQuarterlyBudget':
                IntentHandler.getQuarterlyBudget(req, res);
                break;

            case 'GetYearlyBudget':
                IntentHandler.getYearlyBudget(req, res);
                break;

            case 'GetMonthlyIncome':
                IntentHandler.getMonthlyIncome(req, res);
                break;

            // TOP CATEGORIES BY MONTH / QUARTER / YEAR
            case 'GetMonthlyTopCategory':
                IntentHandler.getMonthlyTopCategory(req, res);
                break;

            case 'GetQuarterlyTopCategories':
                IntentHandler.getQuarterlyTopCategories(req, res);
                break;

            case 'GetYearlyTopCategories':
                IntentHandler.getYearlyTopCategories(req, res);
                break;

            // WRITE OPERATIONS
            case 'AddBudget':
                IntentHandler.addBudget(req, res);
                break;

            case 'AddExpense':
                IntentHandler.addExpense(req, res);
                break;

            case 'AddIncome':
                IntentHandler.addIncome(req, res);
                break;
            
            case 'AddCategory':
                IntentHandler.addCategory(req, res);
                break;
            
            // READ OPERATIONS

            case 'GetBalance':
                IntentHandler.getBalance(req, res);
                break;

            case 'GetTopCategories':
                IntentHandler.getTopCategories(req, res);
                break;

            // MISC
            case 'LastTransaction':
                IntentHandler.getLastTransaction(req, res);
                break;

            // FALLBACK
            default:
                IntentHandler.notFound(req, res);
            
        }
    }
};

function handleAddExpenseIntent(req, res) {
    console.log('Inside add expense')
    console.log(req.body.request.intent.slots)
    let amount = 0
    let dollar = req.body.request.intent.slots['dollars']['value'];
    let cents = req.body.request.intent.slots['cents']['value'];
    if(dollar === undefined)
        amount = parseFloat('.' + cents.toString())
    else if(cents === undefined)
        amount = parseFloat(dollar.toString())
    console.log(typeof(amount))
    let date = req.body.request.intent.slots['time']['value'];
    let category = req.body.request.intent.slots['class']['value'];
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
    let date = req.body.request.intent.slots['time']['value'];
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
    let month = req.body.request.intent.slots['time']['value'];
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
    let month = req.body.request.intent.slots['time']['value'];
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
    let month = req.body.request.intent.slots['time']['value'];
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
    let month = req.body.request.intent.slots['time']['value'];
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
