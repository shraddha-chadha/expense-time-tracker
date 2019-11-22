const defaultResponse = require('./intents/default'); 
      
module.exports = (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    console.log(req.body);
    switch(intentName) {
        case "Last Transaction":
            lastTransaction(res);
            break;
        case "Add Expense":
            addExpense(req, res);
            break; 
        case "Add Budget":
            addBudget(req, res);
            break; 
        case "Add Income":
            addIncome(req, res);
            break;  
        case "Add Category":
            addCategory(req, res);
            break;  
        case "Get Expense":
            getExpense(req, res);
            break; 
        case "Get Budget":
            getBudget(req, res);
            break; 
        case "Get Income":
            getIncome(req, res);
            break; 
        case "Get Saving":
            getSaving(req, res);
            break; 
        case "Get Balance":
            getBalance(req, res);
            break; 
        case "Get Top Categories":
            getTopCategories(req, res); 
        default:
            res.send(defaultResponse());
    }
};

function lastTransaction(res) {
    console.log('Inside last transaction');    
    return res.send({"fulfillmentText": "Your last transaction was 5 dollars."})
}

function addExpense(req, res) {
    console.log(req.body.queryResult.parameters); 
    let amount = 0
    let dollar = req.body.queryResult.parameters['dollars'];
    console.log(dollar); 
    let cents = req.body.queryResult.parameters['cents'];
    if(dollar === undefined)
        amount = parseFloat('.' + cents.toString())
    else if(cents === undefined)
        amount = parseFloat(dollar.toString())
    console.log(typeof(amount))
    amount = dollar + (cents/100)
    console.log(amount)
    let date = req.body.queryResult.parameters['time'];
    let category = req.body.queryResult.parameters['class'];
    console.log('********************************')
    console.log(amount, date, category)
    console.log('********************************')
    return res.send({
        
                "fulfillmentText": `The amount has been added to your expenses for the ${category} category`
            }
        
    
    )
}


function addBudget(req, res) {
    console.log('Inside add budget')
    console.log(req.body.queryResult.parameters)
    let dollars = req.body.queryResult.parameters['dollars'];
    let date = req.body.queryResult.parameters['time'];
    let category = req.body.queryResult.parameters['class'];
    console.log('********************************')
    console.log(dollars, date, category)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your budget for ${category} has been set.`
    })
}

function addIncome(req, res) {
    console.log('Inside add income')
    console.log(req.body.queryResult.parameters)
    let dollars = req.body.queryResult.parameters['dollars'];
    let date = req.body.queryResult.parameters['customDate'];
    console.log('********************************')
    console.log(dollars, date)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your income amount of ${dollars} dollars has been added.`
    })
}

function addCategory(req, res) {
    console.log('Inside add category')
    console.log(req.body.queryResult.parameters)
    let category = req.body.queryResult.parameters['class'];
    console.log('********************************')
    console.log(category)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your new spending category ${category} has been created.`
    })
}

function getExpense(req, res) {
    console.log('Inside get expense')
    console.log(req.body.queryResult.parameters)
    let month = req.body.queryResult.parameters['time'];
    console.log('********************************')
    console.log(month)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your spending for ${month} is`
    })
}

function getBudget(req, res) {
    console.log('Inside get budget')
    console.log(req.body.queryResult.parameters)
    let month = req.body.queryResult.parameters['time'];
    console.log('********************************')
    console.log(month)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your budget for ${month} is`
    })
}


function getIncome(req, res) {
    console.log('Inside get income')
    console.log(req.body.queryResult.parameters)
    let month = req.body.queryResult.parameters['time'];
    console.log('********************************')
    console.log(month)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your income for ${month} is`
    })
}

function getSaving(req, res) {
    console.log('Inside get savings')
    console.log(req.body.queryResult.parameters)
    let month = req.body.queryResult.parameters['time'];
    console.log('********************************')
    console.log(month)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your savings for ${month} is`
    })
}

function getBalance(req, res) {
    return res.send({
        "fulfillmentText": `Your current balance is`
    }
    )
}

function getTopCategories(req, res) {
    return res.send({
        "fulfillmentText": `Your top categories are`
    }
    )
}
    





