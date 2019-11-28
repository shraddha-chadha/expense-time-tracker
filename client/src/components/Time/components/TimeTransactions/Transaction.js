import React from 'react';
import TimeNavBarLoggedIn from '../../../TimeNavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../../Header';
import Typography from '@material-ui/core/Typography';
import TransactionTable from './components/TransactionTable';

const useStyles = makeStyles(theme => ({
}));

export default function TimeHomepage() {
  const classes = useStyles();

  return (
    <div>
      <TimeNavBarLoggedIn />
      <Header title="Search your tasks and time spent on it" />

      <Grid container>
        <Grid item xs={12}>
          <TransactionTable/>
        </Grid>
      </Grid>
    </div>
  );
}