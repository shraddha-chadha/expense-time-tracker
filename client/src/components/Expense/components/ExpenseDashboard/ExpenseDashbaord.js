import React from 'react';
import NavBar from '../../../NavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import Typing from 'react-typing-animation';
import { makeStyles } from '@material-ui/core/styles';
import Filter from '../../../Filter/Filter';
import DashboardCard from './components/DashboardCard';
import CategoryIcon from './components/CategoryIcon';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import BudgetChecker from './components/BudgetChecker';

const iconTitleMap = {
  totalExpense: {
    icon: 'M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z',
    title: 'Total Expense'
  },

  totalBudget: {
    icon: 'M2,5H22V20H2V5M20,18V7H4V18H20M17,8A2,2 0 0,0 19,10V15A2,2 0 0,0 17,17H7A2,2 0 0,0 5,15V10A2,2 0 0,0 7,8H17M17,13V12C17,10.9 16.33,10 15.5,10C14.67,10 14,10.9 14,12V13C14,14.1 14.67,15 15.5,15C16.33,15 17,14.1 17,13M15.5,11A0.5,0.5 0 0,1 16,11.5V13.5A0.5,0.5 0 0,1 15.5,14A0.5,0.5 0 0,1 15,13.5V11.5A0.5,0.5 0 0,1 15.5,11M13,13V12C13,10.9 12.33,10 11.5,10C10.67,10 10,10.9 10,12V13C10,14.1 10.67,15 11.5,15C12.33,15 13,14.1 13,13M11.5,11A0.5,0.5 0 0,1 12,11.5V13.5A0.5,0.5 0 0,1 11.5,14A0.5,0.5 0 0,1 11,13.5V11.5A0.5,0.5 0 0,1 11.5,11M8,15H9V10H8L7,10.5V11.5L8,11V15Z',
    title: 'Total Budget'
  },

  totalIncome: {
    icon: 'M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z',
    title: 'Total Income'
  },

  totalSavings: {
    icon: 'M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z',
    title: 'Total Savings'
  }
};

const useStyles = makeStyles(theme => ({
  titleBackground: {
    position: 'relative',
    height: 320,
    background: 'linear-gradient(180deg, #FE6B8B 30%, #FF8E53 90%)',
  },

  titleText: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    fontSize: 45,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  subtitle: {
    fontSize: 25,
    fontWeight: 'normal'
  },

  card: {
    maxWidth: 400,
    borderStyle: 'solid',
    borderColor: '#F4F8F8',
    borderWidth: 1,
    boxShadow: '5px 5px 15px grey',
    background: theme.palette.grey[100]
  },

  content: {
    width: 350,
    textAlign: 'center',
    marginBottom: 0
  },

  header: {
    background: '#E94155',
    color: 'white'
  }
}));

export default function ExpenseDashboard() {
  const classes = useStyles();

  return (
    <div>
      <NavBar />

      <Grid container direction="column" spacing={1}>
        <Grid item className={classes.titleBackground}>
          <Typing>
            <div className={classes.titleText}>
              <p>Expense Dashboard</p>
              <p className={classes.subtitle}>Get a snapshot of your expenses</p>
            </div>
          </Typing>
        </Grid>

        <Grid item>
          <Filter />
        </Grid>

        <Grid item>
          <Grid container spacing={2} direction="row" justify='center'>
            <Grid item>
              <DashboardCard
                icon={iconTitleMap.totalExpense.icon}
                title={iconTitleMap.totalExpense.title}
                amount="$4500"
              />
            </Grid>

            <Grid item>
              <DashboardCard
                icon={iconTitleMap.totalBudget.icon}
                title={iconTitleMap.totalBudget.title}
                amount="$4500"
              />
            </Grid>

            <Grid item>
              <DashboardCard
                icon={iconTitleMap.totalIncome.icon}
                title={iconTitleMap.totalIncome.title}
                amount="$4500"
              />
            </Grid>

            <Grid item>
              <DashboardCard
                icon={iconTitleMap.totalSavings.icon}
                title={iconTitleMap.totalSavings.title}
                amount="$4500"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" justify='center' spacing={10} style={{ marginTop: 10 }}>
            <Grid item>
              <Card className={classes.card}>
                <CardContent component="div" className={classes.content}>
                  <Grid container style={{ marginTop: 10, marginBottom: 20 }} justify="center" spacing={6} >
                    <Grid item className={classes.header}>
                      <Typography component="h5" variant="h5">
                        Top Spending Categories
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify='center' spacing={6}>
                    <Grid item>
                      <CategoryIcon category="home" amount="$400" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="bills" amount="$500" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="auto" amount="$500" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="holidays" amount="$500" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="leisure" amount="$500" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="shopping" amount="$500" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="fuel" amount="$500" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="health" amount="$500" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="general" amount="$500" />
                    </Grid>
                    <Grid item>
                      <CategoryIcon category="food" amount="$500" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent component="div" className={classes.content}>
                  <Grid container style={{ marginTop: 10, marginBottom: 20 }} justify="center" spacing={6} >
                    <Grid item className={classes.header}>
                      <Typography component="h5" variant="h5">
                        Linked Bank Accounts
                    </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent component="div" className={classes.content}>
                  <Grid container style={{ marginTop: 10, marginBottom: 20 }} justify="center" spacing={6} >
                    <Grid item className={classes.header}>
                      <Typography component="h5" variant="h5">
                        Budget Checker
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item>
                      <BudgetChecker />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>

      </Grid>
    </div>
  );
}