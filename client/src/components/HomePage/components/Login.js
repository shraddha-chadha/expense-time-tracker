import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
          />
        </Grid>

        <Grid item xs={12} className={classes.inputContainer}>
          <TextField
            id="login-password"
            label="Password"
            placeholder="Password"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} className={classes.button}>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
