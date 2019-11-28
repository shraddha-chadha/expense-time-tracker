import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const months = [
  { key: 1, value: 'January' },
  { key: 2, value: 'February' },
  { key: 3, value: 'March' },
  { key: 4, value: 'April' },
  { key: 5, value: 'May' },
  { key: 6, value: 'June' },
  { key: 7, value: 'July' },
  { key: 8, value: 'August' },
  { key: 9, value: 'September' },
  { key: 10, value: 'October' },
  { key: 11, value: 'November' },
  { key: 12, value: 'December' }
];

const quarters = [
  { key: 1, value: 'Quarter 1' },
  { key: 2, value: 'Quarter 2' },
  { key: 3, value: 'Quarter 3' },
  { key: 4, value: 'Quarter 4' },
];

const years = (() => {
  let y = [];
  let current_year = new Date().getFullYear();
  let next10year = current_year + 10
  for (let i = 2000; i <= next10year; i++) {
    let temp = { key: i, value: i }
    y.push(temp);
  }
  return y;
})();

const useStyles = makeStyles(theme => ({
  root: {
    margin: 15,
    justifyContent: 'center'
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  button: {
    boxShadow: '5px 5px 15px grey',
    margin: theme.spacing(2),
  }

}));

export default function TransactionFilter(props) {
  const classes = useStyles();
  let date = new Date();
  let current_year = date.getFullYear().toString();
  let current_month = date.getMonth() + 1;
  const [transaction, setTransaction] = React.useState(1);
  const [type, setType] = React.useState('M');
  const [month, setMonth] = React.useState(current_month);
  const [quarter, setQuarter] = React.useState(1);
  const [year, setYear] = React.useState(current_year);
  const [monthVisible, setMonthVisible] = React.useState({ display: 'inline' });
  const [quarterVisible, setQuarterVisible] = React.useState({ display: 'none' });
  const [yearVisible, setYearVisible] = React.useState({ display: 'inline' });

  const handleTypeChange = event => {
    setType(event.target.value);

    if (event.target.value === 1) {
      setMonthVisible({ display: 'inline' });
      setQuarterVisible({ display: 'none' });
      setYearVisible({ display: 'inline' });

    } else if (event.target.value === 2) {
      setMonthVisible({ display: 'none' });
      setQuarterVisible({ display: 'inline' });
      setYearVisible({ display: 'inline' });

    } else {
      setMonthVisible({ display: 'none' });
      setQuarterVisible({ display: 'none' });
      setYearVisible({ display: 'inline' });
    }
  };

  const handleTransactionChange = event => {
    setTransaction(event.target.value);
  };

  const handleMonthChange = event => {
    setMonth(event.target.value);
  };

  const handleQuarterChange = event => {
    setQuarter(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  const handleSearch = () => {
    let values = {
      type: type,
      month: month,
      quarter: quarter,
      year: year
    }
    
    props.parentCallback(values);
  }

  return (
    <div>
      <Grid container className={classes.root} spacing={4}>
      {/* <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="transaction-label">
              Transaction
            </InputLabel>
            <Select
              labelId="transaction-label"
              id="transaction-select"
              color="secondary"
              value={transaction}
              onChange={handleTransactionChange}
            >
              <MenuItem value={1}>Expense</MenuItem>
              <MenuItem value={2}>Budget</MenuItem>
              <MenuItem value={3}>Income</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="type-label">
              Type
            </InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              color="secondary"
              value={type}
              onChange={handleTypeChange}
            >
               <MenuItem value="M">Monthly</MenuItem>
              <MenuItem value="Q">Quarterly</MenuItem>
              <MenuItem value="Y">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item style={monthVisible}>
          <FormControl className={classes.formControl}>
            <InputLabel id="month-label">
              Month
            </InputLabel>
            <Select
              labelId="month-label"
              id="month-select"
              color="secondary"
              value={month}
              onChange={handleMonthChange}
            >
              {months.map(menu => (
                <MenuItem key={menu.key} value={menu.key}>
                  {menu.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item style={quarterVisible}>
          <FormControl className={classes.formControl}>
            <InputLabel id="quarter-label">
              Quarter
            </InputLabel>
            <Select
              labelId="quarter-label"
              id="quarter-select"
              value={quarter}
              color="secondary"
              onChange={handleQuarterChange}
            >
              {quarters.map(menu => (
                <MenuItem key={menu.key} value={menu.key}>
                  {menu.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item style={yearVisible}>
          <FormControl className={classes.formControl}>
            <InputLabel id="year-label">
              Year
            </InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={year}
              color="secondary"
              onChange={handleYearChange}
            >
              {years.map(menu => (
                <MenuItem key={menu.key} value={menu.key}>
                  {menu.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary" className={classes.button} onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}