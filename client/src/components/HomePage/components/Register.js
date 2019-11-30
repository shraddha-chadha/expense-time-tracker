import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import APP_ENV from '../../../env';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const REGISTER_URL = `${APP_ENV.backendUrl}/user/register`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default
  },

  formContainer: {
    flexDirection: 'row',
  },

  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold'
  },

  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40
  },

  button: {
    margin: 40
  },

  error: {
    color: theme.palette.error
  }

}));

export default function Register() {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleFirstChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastChange = (event) => {
    setLastName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleCloseError = () => {
    setOpenError(false);
  }

  const handleSubmit = async() => {
    // Post the values to the Register url
    const API_PARAMS = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "username": username,
      "password": password,
      "amazonId": "null",
      "googleId": "null"
    };

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(API_PARAMS)
    };

    const response = await fetch(REGISTER_URL, options).then(async (response) => {
      const results = await response.json();
      if(results.status >= 200 && results.status < 300 || results.status === undefined) {
        console.log("Results", results);
        setOpen(true);
      } else {
        console.log("ErrorResults", results);
        setErrorMessage(results.message);
        setOpenError(true);
      }
    });
  }

  return (
    <div className={classes.root} id="register">
      <Typography className={classes.title} type="title" color="primary" >
        Register
        </Typography>

      <Grid container>
        <Grid item xs={12} className={classes.inputContainer}>
          <Grid container spacing={3} className={classes.formContainer}>
            <Grid item xs={6}>
              <TextField
                id="login-firstname"
                label="First Name"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="login-lastname"
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.inputContainer}>
          <TextField
            id="login-email"
            label="Email"
            placeholder="Email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>

        <Grid item xs={12} className={classes.inputContainer}>
          <TextField
            id="login-username"
            label="Username"
            placeholder="Username"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
          />
        </Grid>

        <Grid item xs={12} className={classes.inputContainer}>
          <TextField
            id="login-password"
            label="Password"
            placeholder="Password"
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Grid>

        <Grid item xs={12} className={classes.button}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <div className="dialogContainer">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title" color="primary">
            User Registered
        </DialogTitle>
          <DialogContent>
            <Typography>
              User successfully registered. Please login!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
          </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="dialogContainer">
        <Dialog open={openError} onClose={handleCloseError}>
          <DialogTitle id="form-dialog-title-error" className={classes.error}>
            User Registration Error
        </DialogTitle>
          <DialogContent>
            <Typography>
              {errorMessage}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseError} color="primary">
              Ok
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
