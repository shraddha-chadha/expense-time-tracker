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
        case "Get Yearly Expense":
            getYearlyExpense(req, res);
            break; 
        case "Get Monthly Expense":
            getMonthlyExpense(req, res);
            break; 
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
    let cents = req.body.queryResult.parameters['cents'];
    let time = req.body.queryResult.parameters['time'];
    let category = req.body.queryResult.parameters['class'];
    if(dollar === '' && cents !== '') 
        amount = parseFloat('.' + cents.toString())
    else if(dollar !== '' && cents === 0)
        amount = parseFloat(dollar.toString())
    else if (dollar === '' && cents === '')
    return res.send({
        "fulfillmentText" : "Please mention the expense amount"
    })
    else if (dollar !== '' && cents !== '') {
    amount = (dollar + (cents/100)).toString()
    console.log(amount)
    if (time === '')
    return res.send({
        "fulfillmentText" : "Please mention the expense time"
    })
    if (category === '')
    return res.send({
        "fulfillmentText" : "Please mention the expense category"
    })
    console.log('********************************')
    console.log(amount, time, category)
    console.log('********************************')
    return res.send({
        
                "fulfillmentText": `The amount has been added to your expenses for the ${category} category`
            }
        
    
    )
        }
    }


function addBudget(req, res) {
    console.log('Inside add budget')
    console.log(req.body.queryResult.parameters)
    let dollars = req.body.queryResult.parameters['dollars'];
    let month = req.body.queryResult.parameters['month'];
    let category = req.body.queryResult.parameters['class'];
    if (dollars === '')
    return res.send({
        "fulfillmentText": "Please mention dollar amount"})
    else if (category === '')
    return res.send({
        "fulfillmentText": "Please mention budget category"})
    else if (month === '')
    return res.send({
        "fulfillmentText": "Please mention budget month"})
    else {
    console.log('********************************')
    console.log(dollars, month, category)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your budget for ${category} has been set.`
    })
}
}

function addIncome(req, res) {
    console.log('Inside add income')
    console.log(req.body.queryResult.parameters)
    let dollars = req.body.queryResult.parameters['dollars'];
    let time = req.body.queryResult.parameters['time'];
    if (dollars === '')
    return res.send({
        
        "fulfillmentText": "Please mention dollar amount."
    })
    else if (time === '')
    return res.send({
        
        "fulfillmentText": "Please mention the income date."
    })
    else {
    console.log('********************************')
    console.log(dollars, time)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your income amount of ${dollars} dollars has been added.`
    })
}
}

function addCategory(req, res) {
    console.log('Inside add category')
    console.log(req.body.queryResult.parameters)
    let category = req.body.queryResult.parameters['class'];
    if (category === '')
    return res.send({
        "fulfillmentText" : "Please mention your expense category"
    }) 
    else {
    console.log('********************************')
    console.log(category)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your new spending category ${category} has been created.`
    })
}
}

function getExpense(req, res) {
    console.log('Inside get expense')
    console.log(req.body.queryResult.parameters)
    let time = req.body.queryResult.parameters['time'];
    if (time === '')
    return res.send({
        "fulfillmentText": "Please mention month of expense."
    }) 
    else {
    console.log('********************************')
    console.log(time)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your spending for ${time} was`
    })
}
}

function getBudget(req, res) {
    console.log('Inside get budget')
    console.log(req.body.queryResult.parameters)
    let time = req.body.queryResult.parameters['time'];
    if (time === '')
    return res.send({
        "fulfillmentText": "Please mention month of budget."
    }) 
    else {
    console.log('********************************')
    console.log(time)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your budget for ${time} is`
    })
}
}


function getIncome(req, res) {
    console.log('Inside get income')
    console.log(req.body.queryResult.parameters)
    let time = req.body.queryResult.parameters['time'];
    if (time === '')
    return res.send({
        "fulfillmentText": "Please mention month of income."
    }) 
    else {
    console.log('********************************')
    console.log(time)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your income for ${time} is`
    })
}
}

function getSaving(req, res) {
    console.log('Inside get savings')
    console.log(req.body.queryResult.parameters)
    let time = req.body.queryResult.parameters['time'];
    if (time === '')
    return res.send({
        "fulfillmentText": "Please mention month of income."
    }) 
    else {
    console.log('********************************')
    console.log(time)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your savings for ${time} is`
    })
}
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

function getYearlyExpense(req, res) {
    console.log('Inside get yearly expense')
    console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    if (year === '')
    return res.send({
        "fulfillmentText": "Please mention year of expense."
    }) 
    else {
    console.log('********************************')
    console.log(year)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your yearly expenses for ${year} was`
    })
}
}

function getMonthlyExpense(req, res) {
    console.log('Inside get monthly expense')
    console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    let month = req.body.queryResult.parameters['month'];
    if (year === '' && month === '')
    return res.send({
        "fulfillmentText": "Please mention month of expense."
    }) 
    if (month !== '' && year === '')
    return res.send({
        "fulfillmentText": "Please mention year of expense."
    }) 
    console.log('********************************')
    console.log(month, year)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your monthly expenses for ${month} ${year} was`
    })
}
    





