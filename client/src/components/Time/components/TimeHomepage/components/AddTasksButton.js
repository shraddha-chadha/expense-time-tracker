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
import Typography from '@material-ui/core/Typography';
import APP_ENV from '../../../../../env';

const useStyles = makeStyles(theme => ({
  button: {
    boxShadow: '5px 5px 15px grey'
  },

  textField: {
    width: 250
  }
}));

const categories = [
  { key: 'home', value: 'Home' },
  { key: 'food', value: 'Food' },
  { key: 'bills', value: 'Bills' },
  { key: 'auto', value: 'Auto' },
  { key: 'holidays', value: 'Holidays' },
  { key: 'leisure', value: 'Leisure' },
  { key: 'shopping', value: 'Shopping' },
  { key: 'fuel', value: 'Fuel' },
  { key: 'health', value: 'Health' },
  { key: 'general', value: 'General' }
];

export default function AddTasksButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [estimates, setEstimates] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date(new Date()));
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEstimatesChange = event => {
    setEstimates(event.target.value);
  };

  const getMonth = date => {
    let m;
    return (m = date.getMonth() + 1) < 10 ? `0${m}` : `${m}`;
  };

  const getYear = date => {
    return date.getFullYear();
  };

  const getDay = date => {
    let d;
    return (d = date.getDate()) < 10 ? `0${d}` : `${d}`;
  };

  const formatDate = date => {
    let month = getMonth(date);
    let day = getDay(date);
    let year = getYear(date);
    return [year, month, day].join('-');
  }

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleSave = async() => {
    const USERNAME = localStorage.getItem("username");
    const TOKEN = localStorage.getItem("webToken");
    const URL= `${APP_ENV.backendUrl}/tasks/addTask/${USERNAME}?username=${USERNAME}`;
    // Post the values to the Add expense url
    const API_PARAMS = {
      "taskName":name,
      "taskDate": formatDate(selectedDate),
      "hoursEstimate": estimates,
      "hoursActual": 0,
      "username": USERNAME
    };

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(API_PARAMS)
    };

    const response = await fetch(URL, options).then(async (response) => {
      const results = await response.json();
      if(results.status >= 200 && results.status < 300 || results.status === undefined) {
        setOpenSuccess(true);
        console.log("Results of Task added", results);
      } else {
        setOpenError(true);
        console.log("ErrorResults", results);
      }
    });

  }

  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen}>
        Add Tasks
      </Button>

      <div className="dialogContainer">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">
            Add Tasks
        </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="time_name"
                  label="Name"
                  value={name}
                  onChange={handleNameChange}
                  className={classes.textField}
                />
              </Grid>

              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="estimates"
                  label="Estimates"
                  value={estimates}
                  onChange={handleEstimatesChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                  }}
                  className={classes.textField}
                />
              </Grid>

              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.textField}
                    margin="normal"
                    id="time-date"
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
            <Button color="primary" onClick={handleSave}>
              Save
          </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="dialogContainer">
        <Dialog open={openSuccess} onClose={handleSuccessClose}>
          <DialogTitle id="form-dialog-title" color="primary">
            Add Tasks
        </DialogTitle>
          <DialogContent>
            <Typography>
              Task is saved successfully
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
          <DialogTitle id="form-dialog-title-error" className={classes.error}>
            Add Tasks
        </DialogTitle>
          <DialogContent>
            <Typography>
              There was a problem saving tasks
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