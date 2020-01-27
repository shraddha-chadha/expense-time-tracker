import React from 'react';
import ActionCard from './components/ActionCard';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../../NavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import AddExpenseButton from './components/AddExpenseButton';
import LinkAccountButton from './components/LinkAccountButton';
import BudgetButton from './components/BudgetButton';
import IncomeButton from './components/IncomeButton';
import AlexaButton from './components/AlexaButton';
import GoogleButton from './components/GoogleButton';
import UtterancesButton from './components/UtterancesButton'
import TimeButton from './components/TimeButton';

const iconTitleMap = {
  linkAccount: {
    icon: 'M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z',
    subtitle: 'Save efforts by linking all the bank accounts'
  },

  addExpense: {
    icon: 'M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
    subtitle: 'Track your day to day expenses manually'
  },

  setBudget: {
    icon: 'M2,5H22V20H2V5M20,18V7H4V18H20M17,8A2,2 0 0,0 19,10V15A2,2 0 0,0 17,17H7A2,2 0 0,0 5,15V10A2,2 0 0,0 7,8H17M17,13V12C17,10.9 16.33,10 15.5,10C14.67,10 14,10.9 14,12V13C14,14.1 14.67,15 15.5,15C16.33,15 17,14.1 17,13M15.5,11A0.5,0.5 0 0,1 16,11.5V13.5A0.5,0.5 0 0,1 15.5,14A0.5,0.5 0 0,1 15,13.5V11.5A0.5,0.5 0 0,1 15.5,11M13,13V12C13,10.9 12.33,10 11.5,10C10.67,10 10,10.9 10,12V13C10,14.1 10.67,15 11.5,15C12.33,15 13,14.1 13,13M11.5,11A0.5,0.5 0 0,1 12,11.5V13.5A0.5,0.5 0 0,1 11.5,14A0.5,0.5 0 0,1 11,13.5V11.5A0.5,0.5 0 0,1 11.5,11M8,15H9V10H8L7,10.5V11.5L8,11V15Z',
    subtitle: 'Set monthly budget to control spendings'
  },

  setIncome: {
    icon: 'M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z',
    subtitle: 'Set monthly income to know your savings'
  },

  addCategory: {
    icon: 'M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z',
    subtitle: 'Add new categories to track expenses'
  },

  alexa: {
    icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10.43,21.87V19.91C10.43,19.22 10,18.57 9.35,18.3C6.91,17.26 5.17,14.83 5.17,12C5.17,8.26 8.22,5.17 12,5.17C15.78,5.17 18.83,8.26 18.83,12C18.83,16.43 15.39,20.61 10.43,21.87Z',
    subtitle: 'Link Amazon Alexa with the CashClock skill'
  },

  google: {
    icon: 'M8.06,7.78C7.5,7.78 7.17,7.73 7.08,7.64L6.66,13.73C7.19,14.05 7.88,14.3 8.72,14.5C9.56,14.71 10.78,14.77 12.38,14.67C13.97,14.58 15.63,14.23 17.34,13.64L16.55,4.22C15.67,5.09 14.38,5.91 12.66,6.66C11.13,7.31 9.81,7.69 8.72,7.78H8.06M7.97,5.34C7.28,5.94 7,6.34 7.13,6.56C7.22,6.78 7.7,6.84 8.58,6.75C9.67,6.66 10.91,6.31 12.28,5.72C13.22,5.31 14.03,4.88 14.72,4.41C15.41,3.94 15.88,3.55 16.13,3.23C16.38,2.92 16.47,2.7 16.41,2.58C16.34,2.42 16.03,2.34 15.47,2.34C14.34,2.34 12.94,2.7 11.25,3.42C9.81,4.05 8.72,4.69 7.97,5.34M17.34,2.2C17.41,2.33 17.44,2.47 17.44,2.63L18.61,17C18.61,18.73 18,20.09 16.83,21.07C15.64,22.05 14.03,22.55 12,22.55C10,22.55 8.4,22.04 7.2,21C6,20 5.39,18.64 5.39,16.92L6.09,6.47C6.09,6.22 6.2,5.94 6.42,5.63C6.64,5.31 6.84,5.06 7.03,4.88L7.36,4.59C8.33,3.78 9.5,3.08 10.88,2.5C11.81,2.08 12.73,1.77 13.62,1.57C14.5,1.37 15.3,1.3 16,1.38C16.71,1.46 17.16,1.73 17.34,2.2Z',
    subtitle: 'Link Google Home with the CashClock skill'
  },

  utterances: {
    icon: 'M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z',
    subtitle: 'Check the features to try with personal voice assistants'
  },


  time: {
    icon: 'M14,12H15.5V14.82L17.94,16.23L17.19,17.53L14,15.69V12M4,2H18A2,2 0 0,1 20,4V10.1C21.24,11.36 22,13.09 22,15A7,7 0 0,1 15,22C13.09,22 11.36,21.24 10.1,20H4A2,2 0 0,1 2,18V4A2,2 0 0,1 4,2M4,15V18H8.67C8.24,17.09 8,16.07 8,15H4M4,8H10V5H4V8M18,8V5H12V8H18M4,13H8.29C8.63,11.85 9.26,10.82 10.1,10H4V13M15,10.15A4.85,4.85 0 0,0 10.15,15C10.15,17.68 12.32,19.85 15,19.85A4.85,4.85 0 0,0 19.85,15C19.85,12.32 17.68,10.15 15,10.15Z',
    subtitle: 'Switch to Time Tracker'
  }
};

const useStyles = makeStyles(theme => ({
  cardContainer1: {
    background: theme.palette.grey[300],
    justifyContent: "center"
  },

  cardContainer2: {
    background: theme.palette.grey[400],
    justifyContent: "center"
  },

  cardContainer3: {
    background: theme.palette.grey[500],
    justifyContent: "center"
  },

  actionPannelText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#696969',
    fontSize: 25,
    marginTop: 40
  }

}));

export default function ExpenseHomePage() {
  const classes = useStyles();

    return (
      <div>
        <NavBar title ="Homepage" />
        {/* <Header title="Take actions to manage your expenses" /> */}
        
        <Grid container>
          <Grid item xs={12}>
            <Grid container className={classes.cardContainer1} >
              <Grid item xs={12}>
                <Typography className={classes.actionPannelText}>
                  Expense Tracking
                </Typography>
              </Grid>
  
              <Grid item>
                <ActionCard
                  icon={iconTitleMap.linkAccount.icon}
                  subtitle={iconTitleMap.linkAccount.subtitle}
                  button = {<LinkAccountButton />}
                />
              </Grid>
  
              <Grid item>
                <ActionCard
                  icon={iconTitleMap.addExpense.icon}
                  subtitle={iconTitleMap.addExpense.subtitle}
                  button = {<AddExpenseButton />}
                />
              </Grid>
  
              <Grid item>
                <ActionCard
                  icon={iconTitleMap.setBudget.icon}
                  subtitle={iconTitleMap.setBudget.subtitle}
                  button = {<BudgetButton />}
                />
              </Grid>
  
              <Grid item>
                <ActionCard
                  icon={iconTitleMap.setIncome.icon}
                  subtitle={iconTitleMap.setIncome.subtitle}
                  button = {<IncomeButton />}
                />
              </Grid>
  
              {/* <Grid item>
                <ActionCard
                  icon={iconTitleMap.addCategory.icon}
                  subtitle={iconTitleMap.addCategory.subtitle}
                  button = {<CategoryButton />}
                />
              </Grid> */}
            </Grid>
          </Grid>
  
          <Grid item xs={12}>
            <Grid container className={classes.cardContainer2}>
              <Grid item xs={12}>
                <Typography className={classes.actionPannelText}>
                  Personal Voice Assistants
                </Typography>
              </Grid>
  
              <Grid item>
                <ActionCard
                  icon={iconTitleMap.alexa.icon}
                  subtitle={iconTitleMap.alexa.subtitle}
                  button = {<AlexaButton />}
                />
              </Grid>
  
              <Grid item>
                <ActionCard
                  icon={iconTitleMap.google.icon}
                  subtitle={iconTitleMap.google.subtitle}
                  button = {<GoogleButton />}
                />
              </Grid>
  
              <Grid item>
                <ActionCard
                  icon={iconTitleMap.utterances.icon}
                  subtitle={iconTitleMap.utterances.subtitle}
                  button = {<UtterancesButton />}
                />
              </Grid>
            </Grid>
          </Grid>
  
          <Grid item xs={12}>
            <Grid container className={classes.cardContainer3}>
              <Grid item xs={12}>
                <Typography className={classes.actionPannelText}>
                  Time Tracking
                </Typography>
              </Grid>
  
              <Grid item>
                <ActionCard
                  icon={iconTitleMap.time.icon}
                  subtitle={iconTitleMap.time.subtitle}
                  button = {<TimeButton />}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}