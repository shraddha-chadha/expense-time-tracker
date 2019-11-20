const defaultResponse = require('./intents/default'), 
      lastTransaction = require('./intents/last-transaction'),
      highestExpense = require('./intents/highest-expense');

module.exports = (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    console.log(req.body);
    switch(intentName) {
        case "Last Transaction":
            res.send(lastTransaction());
            break;
        case "Highest Expense":
            res.send(highestExpense());
            break;
        default:
            res.send(defaultResponse());
    }
};