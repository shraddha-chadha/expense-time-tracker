///// MAPPING ALL INTENT HANDLERS
const getMonthlyExpense = require('./get-monthly-expense');
const getQuarterlyExpense = require('./get-quarterly-expense');
const getYearlyExpense = require('./get-yearly-expense');
const getMonthlySavings = require('./get-monthly-savings');
const getQuarterlySavings = require('./get-quarterly-savings');
const getYearlySavings = require('./get-yearly-savings');
const getMonthlyIncome = require('./get-monthly-income');
const getQuarterlyIncome = require('./get-quarterly-income');
const getYearlyIncome = require('./get-yearly-income');
const getLastTransaction = require('./get-last-transaction');
const notFound = require('./not-found');
const addBudget = require('./add-budget');

module.exports = {
    getYearlyExpense: getYearlyExpense,
    getMonthlyExpense: getMonthlyExpense,
    getQuarterlyExpense: getQuarterlyExpense,
    getYearlySavings: getYearlySavings,
    getMonthlySavings: getMonthlySavings,
    getQuarterlySavings: getQuarterlySavings,
    getYearlyIncome: getYearlyIncome,
    getQuarterlyIncome: getQuarterlyIncome,
    getYearlyIncome: getYearlyIncome,
    getLastTransaction: getLastTransaction,
    notFound: notFound,
    addBudget: addBudget
};