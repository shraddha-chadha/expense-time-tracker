import React from 'react';
import { Route, Switch } from "react-router-dom";
import ExpenseHomePage from './components/ExpenseHomePage/ExpenseHomepage';
import ExpenseDashboard from './components/ExpenseDashboard/ExpenseDashbaord';
import ExpenseAnalytics from './components/ExpenseAnalytics/ExpenseAnalytics';
import Transactions from './components/Transactions/Transactions';
import AuthService from '../../services/AuthService';
import {Redirect} from 'react-router-dom';

export default function Expense(props) {
  const TOKEN = localStorage.getItem("webToken");
  const AUTH_SERVICE = new AuthService();
  const username = AUTH_SERVICE.getUsername(TOKEN);
  if(AUTH_SERVICE.isTokenExpired(TOKEN)) {
    return <Redirect to='/'/>;
  } else {
  return (
    <div>
      <Switch>
        <Route exact path={props.match.path} component={ExpenseHomePage} />
        <Route path={`${props.match.path}/dashboard`} component={ExpenseDashboard} />
        <Route path={`${props.match.path}/analytics`} component={ExpenseAnalytics} />
        <Route path={`${props.match.path}/transactions`} component={Transactions} />
      </Switch>
    </div>
  );
}
}