import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import APP_ENV from '../../../env';
import {Redirect} from 'react-router-dom';

const LOGIN_URL = `${APP_ENV.backendUrl}/user/authenticate`;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[50]
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
  }

}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async() => {
     // Post the values to the Login url
     const API_PARAMS = {
      "username": username,
      "password": password
    };

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(API_PARAMS)
    };

    const response = await fetch(LOGIN_URL, options).then(async (response) => {
      const results = await response.json();
      if(results.status >= 200 && results.status < 300 || results.status === undefined) {
        console.log("Results", results);
        window.localStorage.setItem("webToken",results.token);
        window.localStorage.setItem("username",results.username);
        setRedirect(true);
      } else {
        console.log("ErrorResults", results);

      } 
    });
  }

  if(redirect) {
    return <Redirect to='/expense'/>;
  } else {
    return (
      <div className={classes.root} id="login">
        <Typography className={classes.title} type="title" color="primary" >
          Login
          </Typography>
  
        <Grid container>
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
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Grid>
  
          <Grid item xs={12} className={classes.button}>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
