import React from 'react';
import { Route, Switch } from "react-router-dom";
import TimeHomepage from './components/TimeHomepage/TimeHomepage';

export default function Expense(props) {
  return (
    <div>
      <Switch>
        <Route exact path={props.match.path} component={TimeHomepage} />
        {/* <Route path={`${props.match.path}/dashboard`} component={ExpenseDashboard} />
        <Route path={`${props.match.path}/analytics`} component={ExpenseAnalytics} />
        <Route path={`${props.match.path}/transactions`} component={ExpenseTransactions} /> */}
      </Switch>
    </div>
  );
}