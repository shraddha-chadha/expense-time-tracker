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
const getMonthlyTopCategory = require('./get-monthly-top-category');
const getQuarterlyTopCategories = require('./get-quarterly-top-categories');
const getYearlyTopCategories = require('./get-yearly-top-categories');
const getMonthlyBudget = require('./get-monthly-budget');
const getQuarterlyBudget = require('./get-quarterly-budget');
const getYearlyBudget = require('./get-yearly-budget');
const getLastTransaction = require('./get-last-transaction');
const notFound = require('./not-found');
const addBudget = require('./add-budget');
const addIncome = require('./add-income');
const addCategory = require('./add-category');
const addExpense = require('./add-expense');
const login = require('./login');

module.exports = {
    login: login,
    getYearlyExpense: getYearlyExpense,
    getMonthlyExpense: getMonthlyExpense,
    getQuarterlyExpense: getQuarterlyExpense,
    getYearlySavings: getYearlySavings,
    getMonthlySavings: getMonthlySavings,
    getQuarterlySavings: getQuarterlySavings,
    getQuarterlyIncome: getQuarterlyIncome,
    getYearlyIncome: getYearlyIncome,
    getLastTransaction: getLastTransaction,
    getMonthlyTopCategory: getMonthlyTopCategory,
    getQuarterlyTopCategories: getQuarterlyTopCategories,
    getQuarterlyTopCategories: getQuarterlyTopCategories,
    getMonthlyBudget: getMonthlyBudget,
    getQuarterlyBudget: getQuarterlyBudget,
    getYearlyBudget: getYearlyBudget,
    notFound: notFound,
    addBudget: addBudget,
    addIncome: addIncome,
    addCategory: addCategory,
    addExpense: addExpense,
    getMonthlyIncome: getMonthlyIncome,
    getYearlyTopCategories: getYearlyTopCategories
};