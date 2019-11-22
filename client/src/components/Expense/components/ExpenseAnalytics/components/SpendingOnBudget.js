import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ProgressBar from './ProgressBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  card: {
    maxWidth: 900,
    borderStyle: 'solid',
    borderColor: '#F4F8F8',
    borderWidth: 1,
    boxShadow: '5px 5px 15px grey',
    background: theme.palette.grey[100],
    margin: 'auto'
  },

  content: {
    width: 900,
    padding: 0,
    textAlign: 'center',
    marginBottom: 0
  },

  incomeText: {
    fontSize: 20
  }
}));

export default function SpendingOnBudget(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent component="div" className={classes.content}>
          <Typography color="textPrimary" className={classes.incomeText}>
            Your total budget is $4500
          </Typography>
          <Grid container direction="row" justify="space-around" spacing={2}>
            <Grid item>
              <ProgressBar category="home" amount="10" />
            </Grid>

            <Grid item>
              <ProgressBar category="food" amount="20" />
            </Grid>

            <Grid item>
              <ProgressBar category="bills" amount="10" />
            </Grid>

            <Grid item>
              <ProgressBar category="auto" amount="6" />
            </Grid>

            <Grid item>
              <ProgressBar category="holidays" amount="10" />
            </Grid>

            <Grid item>
              <ProgressBar category="leisure" amount="50" />
            </Grid>

            <Grid item>
              <ProgressBar category="shopping" amount="60" />
            </Grid>

            <Grid item>
              <ProgressBar category="fuel" amount="40" />
            </Grid>

            <Grid item>
              <ProgressBar category="health" amount="8" />
            </Grid>

            <Grid item>
              <ProgressBar category="general" amount="20" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}