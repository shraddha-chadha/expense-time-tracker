import React from 'react';
import NavBar from '../../../NavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import Typing from 'react-typing-animation';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../../Header';
import TransactionFilter from '../../../Filter/TransactionFilter';
import TransactionTable from './TransactionTable';
import APP_ENV from '../../../../env';

const rows = [
  { id: 1, transaction: 'Expense', category: 'Food', amount: '500', month: 'January', quarter: '1', year: '2017' },
  { id: 2, transaction: 'Budget', category: '', amount: '500', month: 'January', quarter: '1', year: '2017' },
  { id: 3, transaction: 'Income', category: '', amount: '500', month: 'January', quarter: '1', year: '2017' }
]

const useStyles = makeStyles(theme => ({
}));

export default function Transactions() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);

  const searchCallBack = async (values) => {
    const USERNAME = localStorage.getItem("username");
    const TOKEN = localStorage.getItem("webToken");
    const URL = `${APP_ENV.backendUrl}/metrics/allExpenses/${USERNAME}`;
    let {type, month, quarter, year} = values

    // Post method
    let totalURL = `${URL}/${type}/${month}/${quarter}/${year}`;
    console.log("URL", totalURL);

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    const response = await fetch(totalURL, options).then(async (response) => {
      const results = await response.json();
      if(results.status >= 200 && results.status < 300 || results.status === undefined) {
        console.log("Totals Results", results);
        setRows(results);
      } else {
        console.log("ErrorResults", results);
      }
    });
  };

  return(
    <div>
      <NavBar />
      <Header title="Search the expense, budget and income transactions" />

      <Grid container justify="center" direction="column" spacing={2}>
        <Grid item>
          <TransactionFilter parentCallback= {searchCallBack}/>
        </Grid>
        <Grid item>
          <TransactionTable rows={rows} />
        </Grid>
      </Grid>
    </div>
  );
}