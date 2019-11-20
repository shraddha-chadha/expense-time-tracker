import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    boxShadow: '5px 5px 15px grey'
  },

  textField: {
    width: 250
  }
}));

const categories = [
  { key: '1', value: 'Home' },
  { key: '2', value: 'Food' },
  { key: '3', value: 'Bills' },
  { key: '4', value: 'Auto' },
  { key: '5', value: 'Holidays' },
  { key: '6', value: 'Entertainment' },
  { key: '7', value: 'Shopping' },
  { key: '8', value: 'Fuel' },
  { key: '9', value: 'Health' },
  { key: '10', value: 'General' }
];

export default function AddExpenseButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('Home');
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setCategory(event.target.value);
  }

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen}>
        Add Expense
      </Button>

      <div className="dialogContainer">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">
            Add Expense Transaction
        </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  id="select-category"
                  select
                  label="Select Category"
                  className={classes.textField}
                  value={category}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.categoryMenu,
                    },
                  }}
                  margin="normal"
                >
                  {categories.map(option => (
                    <option key={option.key} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="expense_name"
                  label="Name"
                  className={classes.textField}
                />
              </Grid>

              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="expense_amount"
                  label="Amount"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  className={classes.textField}
                />
              </Grid>

              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.textField}
                    margin="normal"
                    id="expense-date"
                    label="Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button color="primary">
              Save
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}