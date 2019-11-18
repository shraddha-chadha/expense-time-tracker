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
import Expense from './components/Expense/Expense'


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/expense" component={Expense} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
