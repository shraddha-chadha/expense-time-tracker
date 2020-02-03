import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import APP_ENV from '../../../../../env';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  button: {
    // boxShadow: '5px 5px 15px grey'
  },

  textField: {
    width: 250
  }

}));

const months = [
  {key: 1, value: 'January'},
  {key: 2, value: 'February'},
  {key: 3, value: 'March'},
  {key: 4, value: 'April'},
  {key: 5, value: 'May'},
  {key: 6, value: 'June'},
  {key: 7, value: 'July'},
  {key: 8, value: 'August'},
  {key: 9, value: 'September'},
  {key: 10, value: 'October'},
  {key: 11, value: 'November'},
  {key: 12, value: 'December'}
];

const years = (() => {
  let y = [];
  let current_year = new Date().getFullYear();
  let next10year = current_year + 10
  for (let i = 2000; i <= next10year; i++) {
    let temp = { key: i, value: i}
    y.push(temp);
  }
  return y;
})();

export default function IncomeButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let date = new Date();
  let current_year = date.getFullYear();
  let current_month = date.getMonth();
  const [month, setMonth] = React.useState(current_month);
  const [year, setYear] = React.useState(current_year);
  const [amount, setAmount] = React.useState(0);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleMonthChange = event => {
    setMonth(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const getQuarter = month => {
    return (Math.ceil(month / 3));
  };

  const handleSave = async() => {
    const USERNAME = localStorage.getItem("username");
    const TOKEN = localStorage.getItem("webToken");
    const BUDINC_INDICATOR = 'Income';
    const DAYMON_INDIACTOR = 'M';
    const URL= `${APP_ENV.backendUrl}/addTransaction/${USERNAME}/${BUDINC_INDICATOR}/${DAYMON_INDIACTOR}?`;
    // Post the values to the Add Budget url
    let quarter = getQuarter(month);
    let incomeURL = `${URL}amount=${amount}&day=0&month=${month}&quarter=${quarter}&year=${year}`

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    const response = await fetch(incomeURL, options).then(async (response) => {
      const results = await response.json();
      if(results.status >= 200 && results.status < 300 || results.status === undefined) {
        setOpenSuccess(true);
        console.log("Results", results);
      } else {
        setOpenError(true);
        console.log("ErrorResults", results);
      }
    });

  };

  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen}>
        Set Income
      </Button>

      <div className="dialogContainer">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">
            Set Income
        </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  id="select-month"
                  select
                  label="Select Month"
                  className={classes.textField}
                  value={month}
                  onChange={handleMonthChange}
                  SelectProps={{
                    native: true
                  }}
                  margin="normal"
                >
                  {months.map(option => (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item>
                <TextField
                  id="select-year"
                  select
                  label="Select Year"
                  className={classes.textField}
                  value={year}
                  onChange={handleYearChange}
                  SelectProps={{
                    native: true
                  }}
                  margin="normal"
                >
                  {years.map(option => (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="income_amount"
                  label="Income"
                  value={amount}
                  onChange={handleAmountChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  className={classes.textField}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button color="primary" onClick={handleSave}>
              Save
          </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="dialogContainer">
        <Dialog open={openSuccess} onClose={handleSuccessClose}>
          <DialogTitle color="primary">
            Add Income
        </DialogTitle>
          <DialogContent>
            <Typography>
              Income is saved successfully
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSuccessClose} color="primary">
              Ok
          </Button>
          </DialogActions>
        </Dialog>
      </div>
      
      <div className="dialogContainer">
        <Dialog open={openError} onClose={handleErrorClose}>
          <DialogTitle className={classes.error}>
            Add Income
        </DialogTitle>
          <DialogContent>
            <Typography>
              There was a problem saving income
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleErrorClose} color="primary">
              Ok
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}