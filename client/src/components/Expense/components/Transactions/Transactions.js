import React from 'react';
import NavBar from '../../../NavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import Typing from 'react-typing-animation';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../../Header';
import TransactionFilter from '../../../Filter/TransactionFilter';
import TransactionTable from './TransactionTable';

const useStyles = makeStyles(theme => ({
}));

export default function Transactions() {
  const classes = useStyles();

  return(
    <div>
      <NavBar />
      <Header title="Search the expense, budget and income transactions" />

      <Grid container justify="center" direction="column" spacing={2}>
        <Grid item>
          <TransactionFilter />
        </Grid>
        <Grid item>
          <TransactionTable />
        </Grid>
      </Grid>
    </div>
  );
}