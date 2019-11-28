import React from 'react';
import TimeNavBarLoggedIn from '../../../TimeNavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../../Header';
import ActionCard from './components/ActionCard';
import ExpenseButton from './components/ExpenseButton';
import AddTasksButton from './components/AddTasksButton';
import TimesheetButton from './components/TimesheetButton';
import Typography from '@material-ui/core/Typography';

const iconTitleMap = {
  task: {
    icon: 'M14,12H15.5V14.82L17.94,16.23L17.19,17.53L14,15.69V12M4,2H18A2,2 0 0,1 20,4V10.1C21.24,11.36 22,13.09 22,15A7,7 0 0,1 15,22C13.09,22 11.36,21.24 10.1,20H4A2,2 0 0,1 2,18V4A2,2 0 0,1 4,2M4,15V18H8.67C8.24,17.09 8,16.07 8,15H4M4,8H10V5H4V8M18,8V5H12V8H18M4,13H8.29C8.63,11.85 9.26,10.82 10.1,10H4V13M15,10.15A4.85,4.85 0 0,0 10.15,15C10.15,17.68 12.32,19.85 15,19.85A4.85,4.85 0 0,0 19.85,15C19.85,12.32 17.68,10.15 15,10.15Z',
    subtitle: 'Add tasks and its estimates'
  },

  timesheet: {
    icon: 'M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
    subtitle: 'Fill your timesheets'
  },

  expense: {
    icon: 'M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z',
    subtitle: 'Switch to Expense Tracker'
  }
};

const useStyles = makeStyles(theme => ({
  cardContainer1: {
    background: theme.palette.grey[300],
    justifyContent: "center"
  },

  actionPannelText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#696969',
    fontSize: 25,
    marginTop: 40
  },

  cardContainer2: {
    background: theme.palette.grey[400],
    justifyContent: "center"
  },

}));

export default function TimeHomepage() {
  const classes = useStyles();

  return (
    <div>
      <TimeNavBarLoggedIn />
      <Header title="Track your tasks and time spent on it" />

      <Grid container>
        <Grid item xs={12}>
          <Grid container className={classes.cardContainer1} >
            <Grid item xs={12}>
              <Typography className={classes.actionPannelText}>
                Time Tracking
          </Typography>
            </Grid>

            <Grid item>
              <ActionCard
                icon={iconTitleMap.task.icon}
                subtitle={iconTitleMap.task.subtitle}
                button={<AddTasksButton />}
              />
            </Grid>

            <Grid item>
              <ActionCard
                icon={iconTitleMap.timesheet.icon}
                subtitle={iconTitleMap.timesheet.subtitle}
                button={<TimesheetButton />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container className={classes.cardContainer2}>
          <Grid item>
            <ActionCard
              icon={iconTitleMap.expense.icon}
              subtitle={iconTitleMap.expense.subtitle}
              button={<ExpenseButton />}
            />
          </Grid>
        </Grid>
      </Grid>

    </div>
  );
}