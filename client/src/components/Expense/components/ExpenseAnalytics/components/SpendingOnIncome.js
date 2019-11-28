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

export default function SpendingOnIncome(props) {
  const classes = useStyles();
  let { totalIncome, categories, categoriesResult } = props;
  let title;
  title = <Typography color="textPrimary" className={classes.incomeText}>Select the filter to see the % spending</Typography>;
  if(totalIncome === 0) {
    title = <Typography color="textPrimary" className={classes.incomeText}>Your income is not set for this month!</Typography>
  } else {
    title = <Typography color="textPrimary" className={classes.incomeText}>Your total income is {totalIncome}</Typography>
  }
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent component="div" className={classes.content}>
          <Grid container spacing={2} direction="column">
            <Grid item>{title}</Grid>
            <Grid item>
            <Grid container direction="row" justify="space-around" spacing={2}>
            {(totalIncome === 0 || totalIncome === null) ? (
              <div></div>
            ) : (
              categories.map((category, index) => {
                return <Grid item>
                <ProgressBar category={category} expense={categoriesResult[category]} amount={(categoriesResult[category] / totalIncome).toFixed(2)} />
              </Grid>
              })
            )}
          </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}