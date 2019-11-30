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
import CompareExpense from './components/CompareExpense';
import APP_ENV from '../../../../env';

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
  const [totals, setTotals] = React.useState({ totalExpense: 0, totalIncome: 0, totalBudget: 0, totalSavings: 0 });
  const [categoriesResult, setCategoriesResult] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [budgetTitle, setBudgetTitle] = React.useState("Select the filter to see the % spending");
  const [incomeTitle, setIncomeTitle] = React.useState("Select the filter to see the % spending");

  React.useEffect(() => {
    setCategories(Object.keys(categoriesResult))
  }, [categoriesResult]);

  const searchCallBack = async (values) => {
    const USERNAME = localStorage.getItem("username");
    const TOKEN = localStorage.getItem("webToken");
    const URL = `${APP_ENV.backendUrl}/metrics`;
    let { type, month, quarter, year } = values

    // Post method for totals
    let totalURL = `${URL}/all/${USERNAME}/${type}/${month}/${quarter}/${year}`;
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
      if (results.status >= 200 && results.status < 300 || results.status === undefined) {
        console.log("Totals Results", results);
        let t = {
          totalExpense: 0,
          totalIncome: 0,
          totalBudget: 0,
          totalSavings: 0
        }

        if ('totalExpense' in results) {
          t['totalExpense'] = Number(results.totalExpense).toFixed(2);
        }
        if ('totalIncome' in results) {
          t['totalIncome'] = Number(results.totalIncome).toFixed(2);
        }
        if ('totalBudget' in results) {
          t['totalBudget'] = Number(results.totalBudget).toFixed(2);
        }
        if ('totalSavings' in results) {
          t['totalSavings'] = Number(results.totalSavings).toFixed(2);
        }

        setTotals(t);
        if(results.totalBudget === 0 || results.totalBudget === undefined) {
          setBudgetTitle("Your budget is not set for this month!");
        } else {
          setBudgetTitle(`Your total budget is ${Number(results.totalBudget).toFixed(2)}`);
        }

        if(results.totalIncome === 0 || results.totalIncome === undefined) {
          setIncomeTitle("Your income is not set for this month!");
        } else {
          setIncomeTitle(`Your total income is ${Number(results.totalIncome).toFixed(2)}`);
        }

      }  else {
        console.log("ErrorResults", results);
      }
    });

    // Post method for top spending categories
    let categoryURL = `${URL}/expensesByCategory/${USERNAME}/${type}/${month}/${quarter}/${year}`;
    console.log("URL", categoryURL);

    const categoryOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    const categoryResponse = await fetch(categoryURL, categoryOptions).then(async (response) => {
      const results = await response.json();
      if (results.status >= 200 && results.status < 300 || results.status === undefined) {
        console.log("Category Results", results);
        setCategoriesResult(results);
      } else {
        console.log("ErrorResults", results);
      }
    });
  };

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
                <Filter parentCallback={searchCallBack} />
              </Grid>
              <Grid item>
                <SpendingOnIncome title={incomeTitle} totalIncome={totals.totalIncome} categoriesResult={categoriesResult} categories={categories}/>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Filter parentCallback={searchCallBack}/>
              </Grid>
              <Grid item>
                <SpendingOnBudget title={budgetTitle} totalBudget={totals.totalBudget} categoriesResult={categoriesResult} categories={categories}/>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2}>
              <Grid item>
                  <CompareExpense />
              </Grid>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}