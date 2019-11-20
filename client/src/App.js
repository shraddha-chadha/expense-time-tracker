import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Homepage from './components/HomePage/Homepage';
import Expense from './components/Expense/Expense';
import Time from './components/Time/Time';
import Voice from './components/Voice/Voice';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/expense" component={Expense} />
          <Route path="/time" component={Time} />
          <Route path="/voice" component={Voice} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
