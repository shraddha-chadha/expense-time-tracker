import React from 'react';
import NavBar from '../../../NavBarLoggedIn';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../../../Header';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Filter from '../../../Filter/Filter';
import SpendingOnIncome from './components/SpendingOnIncome';
import SpendingOnBudget from './components/SpendingOnBudget';
import YearFilter from '../../../Filter/YearFilter';
import CompareExpense from './components/CompareExpense';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tab: {
    fontSize: 15
  }
}));

export default function ExpenseAnalytics() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue)
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div>
      <NavBar />
      <Header title="Get deeper insights of your expenses" />

      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.tabs}
          >
            <Tab label="% Spending on Income" {...a11yProps(0)} className={classes.tab} />
            <Tab label="% Spending on Budget" {...a11yProps(1)} className={classes.tab} />
            <Tab label="Compare Expenses" {...a11yProps(2)} className={classes.tab} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Filter />
              </Grid>
              <Grid item>
                <SpendingOnIncome />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Filter />
              </Grid>
              <Grid item>
                <SpendingOnBudget />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2}>
             <Grid container direction="column" spacing={2}>
              <Grid item>
                <YearFilter />
              </Grid>
              <Grid item>
                <div id="compare-expenses-chart">
                </div>
                <CompareExpense />
              </Grid>
            </Grid>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}