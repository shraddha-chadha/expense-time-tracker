import React from 'react';
import { Route, Switch } from "react-router-dom";
import ExpenseHomePage from './components/ExpenseHomePage/ExpenseHomepage';
import ExpenseDashboard from './components/ExpenseDashboard/ExpenseDashbaord';

export default function Expense(props) {
  return (
    <div>
      <Switch>
        <Route exact path={props.match.path} component={ExpenseHomePage} />
        <Route path={`${props.match.path}/dashboard`} component={ExpenseDashboard} />
      </Switch>
    </div>
  );
}