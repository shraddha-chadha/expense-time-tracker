import React from 'react';
import { Route, Switch } from "react-router-dom";
import TimeHomepage from './components/TimeHomepage/TimeHomepage';
import TimeTransactions from './components/TimeTransactions/Transaction';
export default function Expense(props) {
  return (
    <div>
      <Switch>
        <Route exact path={props.match.path} component={TimeHomepage} />
        <Route path={`${props.match.path}/transactions`} component={TimeTransactions} />
      </Switch>
    </div>
  );
}