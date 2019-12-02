const fetch = require("node-fetch");
const APP_ENV = require('../env');         // application environment variables
const GET_MONTHLY_BUDGET_URL = `${APP_ENV.backendUrl}/metrics/all`;       // BACKEND API URL
const months = require('./months')
const tokenService =require('../token-service'); 
const ADD_BUDGET_URL = `${APP_ENV.backendUrl}/addTransaction`;
const ADD_EXPENSE_URL = `${APP_ENV.backendUrl}/expense`;
const MONTHLY_TOP_CATEGORY_URL = `${APP_ENV.backendUrl}/metrics/expensesByCategory`;





const defaultResponse = require('./intents/default'); 
      
module.exports = (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    console.log(req.body);
    switch(intentName) {
        case "Login":
            login(req,res);
            break;
        case "Last Transaction":
            lastTransaction(req,res);
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
        case "Get Quarterly Expense":
            getQuarterlyExpense(req, res);
            break; 
        case "Get Monthly Income":
            getMonthlyIncome(req, res);
            break; 
        case "Get Quarterly Income":
            getQuarterlyIncome(req, res);
            break; 
        case "Get Yearly Income":
            getYearlyIncome(req, res);
            break; 
        case "Get Monthly Savings":
            getMonthlySavings(req, res);
            break; 
        case "Get Quarterly Savings":
            getQuarterlySavings(req, res);
            break; 
        case "Get Yearly Savings":
            getYearlySavings(req, res);
            break; 
        case "Get Monthly Budget":
            getMonthlyBudget(req, res);
            break; 
        case "Get Quarterly Budget":
            getQuarterlyBudget(req, res);
            break; 
        case "Get Yearly Budget":
            getYearlyBudget(req, res);
            break; 
        case "Get Top Categories Monthly":
            getTopCategoriesMonthly(req, res);
            break; 
        case "Get Top Categories Quarterly":
            getTopCategoriesQuarterly(req, res);
            break; 
        case "Get Top Categories Yearly":
            getTopCategoriesYearly(req, res);
            break; 
        default:
            res.send(defaultResponse());
    }
};

async function login(req,res) {
    const username = req.body.queryResult.parameters['username'];
    console.log("===> LOGIN", username);

    const response = await tokenService.getAmazonToken(username).then(async (response) => {
        const results = await response.json();
        if(results.status === 404) {
          console.log("ErrorResults", results);
  
        } else {
          console.log("Results", results);
          global.token = results.token
          global.username = results.username
}
    })
    return res.send({
        "fulfillmentText" : "You are logged in."
    })
}; 


    function lastTransaction(req, res) {
    console.log('Inside last transaction');    
    return res.send({"fulfillmentText": "Your last transaction was 5.46 dollars."})
}

    async function addExpense(req, res) {
    // console.log(req.body.queryResult.parameters); 
    let amount = 0
    let dollars = req.body.queryResult.parameters['dollars'];
    // let cents = req.body.queryResult.parameters['cents'];
    let time = req.body.queryResult.parameters['time'];
    let category = req.body.queryResult.parameters['class'];
    if(dollars === '')
    return res.send({
        "fulfillmentText" : "Please mention the expense amount"
    })
    else if (dollars !== '') {
    amount = dollars.toString()
    console.log(amount)
    if (time === '')
    return res.send({
        "fulfillmentText" : "Please mention the expense time"
    })
}
    if (category === '')
    return res.send({
        "fulfillmentText" : "Please mention the expense category"
    })
    let totalURL = `${ADD_EXPENSE_URL}/${global.username}/1`;

    const API_PARAMS = {
            "transactionDate":time,
            "transactionType": "Expense",
            "transactionCategory": category,
            "name": "",
            "amount": dollars,
            "isoCurrencyCode": "USD",
            "unofficialCurrencyCode": "",
            "location":"",
            "month":"",
            "year":"",
            "quarter":"",
            "day":"",
            "isManuallyInserted":""
    }
    console.log(API_PARAMS)

    const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${global.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(API_PARAMS)
      };

    const response = await fetch(totalURL, options).then(async (response) => {
    var results = await response.json();
    if(results.status === 404) {
      console.log("ErrorResults", results);
    } else {
      console.log("Totals Results", results); 

    console.log('********************************')
    console.log("===> ADD EXPENSE", amount, time, category)
    console.log('********************************')
    return res.send({
        
                "fulfillmentText": `The amount of ${dollars} has been added to your expenses for ${time} for the ${category} category`
            })
        }
    })
}; 


    async function addBudget(req, res) {
    console.log('Inside add budget')
    // console.log(req.body.queryResult.parameters)
    let dollars = req.body.queryResult.parameters['dollars'];
    let month = req.body.queryResult.parameters['month'];
    let year = req.body.queryResult.parameters['year'];
    if (dollars === '')
    return res.send({
        "fulfillmentText": "Please mention dollar amount"})
    else if (year === '')
    return res.send({
        "fulfillmentText": "Please mention budget year"})
    else if (month === '')
    return res.send({
        "fulfillmentText": "Please mention budget month"})
    else {
    let totalURL = `${ADD_BUDGET_URL}/${global.username}/Budget/M/?amount=${dollars}&day=0&month=${months.mapping[month]}&year=${year}&quarter=0`;
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
    console.log('********************************')
    console.log("===> ADD BUDGET", dollars, month, year); 
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your budget of $${dollars} for ${month} ${year} has been set.`
    })
}
})
    }
}; 

    async function addIncome(req, res) {
    console.log('Inside add income')
    console.log(req.body.queryResult.parameters)
    let dollars = req.body.queryResult.parameters['dollars'];
    let month = req.body.queryResult.parameters['month'];
    let year = req.body.queryResult.parameters['year'];
    if (dollars === '')
    return res.send({
        
        "fulfillmentText": "Please mention dollar amount."
    })
    else if (month === '')
    return res.send({
        
        "fulfillmentText": "Please mention the income month."
    })
    else if (year === '')
    return res.send({
        
        "fulfillmentText": "Please mention the income year."
    })
    else {
    let totalURL = `${ADD_BUDGET_URL}/${global.username}/Budget/M/?amount=${dollars}&day=0&month=${months.mapping[month]}&year=${year}&quarter=0`;
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
    console.log('********************************')
    console.log("===> ADD INCOME", dollars, month, year); 
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your budget of $${dollars} for ${month} ${year} has been set.`
    })
    }
    })
        }
    }; 
    

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

    async function getYearlyExpense(req, res) {
    let year = req.body.queryResult.parameters['year'];
    if (year === '')
    return res.send({
        "fulfillmentText": "Please mention year of expense."
    }) 
    else {
    console.log("===> GET YEARLY EXPENSE", year);
    console.log('********************************')
    console.log(year)
    console.log('********************************')
    let totalURL = `${GET_MONTHLY_BUDGET_URL}/${global.username}/Y/0/0/${year}`;

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
        
        "fulfillmentText": `Your yearly expense for ${year} is $${Number(results.totalExpense).toFixed(2)}`
    })
}
})
    }}; 

    async function getMonthlyExpense(req, res) {
    // console.log('Inside get monthly expense')
    // console.log(req.body.queryResult.parameters)
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
    console.log("===> GET MONTHLY EXPENSE", month, year);
    console.log('********************************')
    console.log(month, year)
    console.log('********************************')
    let totalURL = `${GET_MONTHLY_BUDGET_URL}/${global.username}/M/${months.mapping[month]}/0/${year}`;
  
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
        
                "fulfillmentText": `Your monthly expenses for ${month} ${year} was $${results.totalExpense}`
            })
                }
            });
    };    
    
function getQuarterlyExpense(req, res) {
    console.log('Inside get quarterly expense')
    // console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    let quarterText = req.body.queryResult.parameters['quarter'];
    let quarter = parseInt(quarterText); 
    console.log(typeof(quarter)); 
    if (year === '' && quarter === '')
    return res.send({
        "fulfillmentText": "Please mention quarter of expense."
    }) 
    if (quarter !== '' && year === '')
    return res.send({
        "fulfillmentText": "Please mention year of expense."
    }) 
    console.log('********************************')
    console.log(quarter, year)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your quarterly expenses for the quarter ${quarter} in the year ${year} was`
    })
}

    async function getMonthlyIncome(req, res) {
    // console.log('Inside get monthly income')
    // console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    let month = req.body.queryResult.parameters['month'];
    if (year === '' && month === '')
    return res.send({
        "fulfillmentText": "Please mention month of income."
    }) 
    if (month !== '' && year === '')
    return res.send({
        "fulfillmentText": "Please mention year of income."
    }) 
    console.log("===> GET MONTHLY INCOME", month, year);
    console.log('********************************')
    console.log(month, year)
    console.log('********************************')
    let totalURL =  `${GET_MONTHLY_BUDGET_URL}/${global.username}/M/${months.mapping[month]}/0/${year}` 
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
        
        "fulfillmentText": `Your monthly income for ${month} ${year}  was $${results.totalIncome}`
    })
}
    })
}; 

// function getQuarterlyIncome(req, res) {
//     console.log('Inside get quarterly income')
//     console.log(req.body.queryResult.parameters)
//     let year = req.body.queryResult.parameters['year'];
//     let quarter = req.body.queryResult.parameters['quarter'];
//     if (year === '' && quarter === '')
//     return res.send({
//         "fulfillmentText": "Please mention quarter of income."
//     }) 
//     if (quarter !== '' && year === '')
//     return res.send({
//         "fulfillmentText": "Please mention year of income."
//     }) 
//     console.log('********************************')
//     console.log(quarter, year)
//     console.log('********************************')
//     return res.send({
        
//         "fulfillmentText": `Your quarterly income for the quarter ${quarter} in the year ${year} was`
//     })
// }

    async function getYearlyIncome(req, res) {
    let year = req.body.queryResult.parameters['year'];
    if (year === '')
    return res.send({
        "fulfillmentText": "Please mention year of income."
    }) 
    else {
    console.log("===> GET YEARLY INCOME", year);
    console.log('********************************')
    console.log(year)
    console.log('********************************')
    let totalURL = `${GET_MONTHLY_BUDGET_URL}/${global.username}/Y/0/0/${year}`;

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
        
        "fulfillmentText": `Your yearly income for ${year} is $${Number(results.totalIncome).toFixed(2)}`
    })
}
})
    }}; 
    
    async function getMonthlySavings(req, res) {
    // console.log('Inside get monthly savings')
    // console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    let month = req.body.queryResult.parameters['month'];
    if (year === '' && month === '')
    return res.send({
        "fulfillmentText": "Please mention month of savings."
    }) 
    if (month !== '' && year === '')
    return res.send({
        "fulfillmentText": "Please mention year of savings."
    }) 
    console.log("===> GET MONTHLY INCOME", month, year);
    console.log('********************************')
    console.log(month, year)
    console.log('********************************')
    let totalURL =  `${GET_MONTHLY_BUDGET_URL}/${global.username}/M/${months.mapping[month]}/0/${year}` 
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
        
        "fulfillmentText": `Your monthly savings for ${month} ${year}  was $${results.totalSavings}`
    })
}
    })
}; 

// function getQuarterlySavings(req, res) {
//     console.log('Inside get quarterly savings')
//     console.log(req.body.queryResult.parameters)
//     let year = req.body.queryResult.parameters['year'];
//     let quarter = req.body.queryResult.parameters['quarter'];
//     if (year === '' && quarter === '')
//     return res.send({
//         "fulfillmentText": "Please mention quarter of savings."
//     }) 
//     if (quarter !== '' && year === '')
//     return res.send({
//         "fulfillmentText": "Please mention year of savings."
//     }) 
//     console.log('********************************')
//     console.log(quarter, year)
//     console.log('********************************')
//     return res.send({
        
//         "fulfillmentText": `Your quarterly savings for the quarter ${quarter} in the year ${year} was`
//     })
// }

    async function getYearlySavings(req, res) {
    // console.log('Inside get yearly savings')
    // console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    if (year === '')
    return res.send({
        "fulfillmentText": "Please mention year of savings."
    }) 
    else {
    console.log("===> GET YEARLY SAVINGS", year);
    console.log('********************************')
    console.log(year)
    console.log('********************************')
    let totalURL = `${GET_MONTHLY_BUDGET_URL}/${global.username}/Y/0/0/${year}`;

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
        
        "fulfillmentText": `Your yearly savings for ${year} is $${Number(results.totalSavings).toFixed(2)}`
    })
}
})
    }}; 

    async function getMonthlyBudget(req, res) {
    console.log('Inside get monthly budget')
    console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    let month = req.body.queryResult.parameters['month'];
    if (year === '' && month === '')
    return res.send({
        "fulfillmentText": "Please mention month of budget."
    }) 
    if (month !== '' && year === '')
    return res.send({
        "fulfillmentText": "Please mention year of budget."
    })
    
    console.log("===> GET MONTHLY BUDGET", month, year);
    let totalURL = `${GET_MONTHLY_BUDGET_URL}/${global.username}/M/${months.mapping[month]}/0/${year}`;
  
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
        
        "fulfillmentText": `Your monthly budget for ${month} ${year} was $${results.totalBudget}`
    })
}
    })
}


  
    
  
    


// function getQuarterlyBudget(req, res) {
//     console.log('Inside get quarterly budget')
//     console.log(req.body.queryResult.parameters)
//     let year = req.body.queryResult.parameters['year'];
//     let quarter = req.body.queryResult.parameters['quarter'];
//     if (year === '' && quarter === '')
//     return res.send({
//         "fulfillmentText": "Please mention quarter of budget."
//     }) 
//     if (quarter !== '' && year === '')
//     return res.send({
//         "fulfillmentText": "Please mention year of budget."
//     }) 
//     console.log('********************************')
//     console.log(quarter, year)
//     console.log('********************************')
//     return res.send({
        
//         "fulfillmentText": `Your quarterly budget for the quarter ${quarter} in the year ${year} was`
//     })
// }

    async function getYearlyBudget(req, res) {
    let year = req.body.queryResult.parameters['year'];
    if (year === '')
    return res.send({
        "fulfillmentText": "Please mention year of budget."
    }) 
    else {
    console.log("===> GET YEARLY BUDGET", year);
    console.log('********************************')
    console.log(year)
    console.log('********************************')
    let totalURL = `${GET_MONTHLY_BUDGET_URL}/${global.username}/Y/0/0/${year}`;

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
        
        "fulfillmentText": `Your yearly budget for ${year} is $${Number(results.totalBudget).toFixed(2)}`
    })
}
})
    }}; 

    async function getTopCategoriesMonthly(req, res) {
    console.log('Inside get top categories monthly')
    // console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    let month = req.body.queryResult.parameters['month'];
    if (year === '' && month === '')
    return res.send({
        "fulfillmentText": "Please mention month of top category."
    }) 
    if (month !== '' && year === '')
    return res.send({
        "fulfillmentText": "Please mention year of top category."
    }) 
    let totalURL = `${MONTHLY_TOP_CATEGORY_URL}/${global.username}/M/${months.mapping[month]}/0/${year}`;

    const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${global.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };
    console.log('********************************')
    console.log("===> GET MONTHLY TOP CATEGORY", month, year)
    console.log('********************************'); 
    const response = await fetch(totalURL, options).then(async (response) => {
    var results = await response.json();
    if(results.status === 404) {
        console.log("ErrorResults", results);
    } else {
        console.log("Totals Results", results);
    var maxKey = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);
    return res.send({
        
        "fulfillmentText": `Your monthly top category amount for ${month} ${year} was $${results[maxKey]} `
    })
}
    })
}; 

// function getTopCategoriesQuarterly(req, res) {
//     console.log('Inside get top categories quarterly')
//     console.log(req.body.queryResult.parameters)
//     let year = req.body.queryResult.parameters['year'];
//     let quarter = req.body.queryResult.parameters['quarter'];
//     if (year === '' && quarter === '')
//     return res.send({
//         "fulfillmentText": "Please mention quarter of top category."
//     }) 
//     if (quarter !== '' && year === '')
//     return res.send({
//         "fulfillmentText": "Please mention year of top category."
//     }) 
//     console.log('********************************')
//     console.log(quarter, year)
//     console.log('********************************')
//     return res.send({
        
//         "fulfillmentText": `Your quarterly top category for the quarter ${quarter} in the year ${year} was`
//     })
// }

function getTopCategoriesYearly(req, res) {
    console.log('Inside get top categories yearly ')
    console.log(req.body.queryResult.parameters)
    let year = req.body.queryResult.parameters['year'];
    if (year === '')
    return res.send({
        "fulfillmentText": "Please mention year of top category."
    }) 
    else {
    console.log('********************************')
    console.log(year)
    console.log('********************************')
    return res.send({
        
        "fulfillmentText": `Your yearly top category for ${year} was`
    })
}
}









    


