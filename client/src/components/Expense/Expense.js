import React from 'react';
import { Route, Switch } from "react-router-dom";
import ExpenseHomePage from './components/ExpenseHomePage/ExpenseHomepage';
import ExpenseDashboard from './components/ExpenseDashboard/ExpenseDashbaord';
import ExpenseAnalytics from './components/ExpenseAnalytics/ExpenseAnalytics';
import ExpenseTransactions from './components/ExpenseTransactions/ExpenseTransactions';

export default function Expense(props) {
  return (
    <div>
      <Switch>
        <Route exact path={props.match.path} component={ExpenseHomePage} />
        <Route path={`${props.match.path}/dashboard`} component={ExpenseDashboard} />
        <Route path={`${props.match.path}/analytics`} component={ExpenseAnalytics} />
        <Route path={`${props.match.path}/transactions`} component={ExpenseTransactions} />
      </Switch>
    </div>
  );
}