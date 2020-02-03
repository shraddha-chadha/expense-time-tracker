import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    // boxShadow: '5px 5px 15px grey'
  },
}));

export default function LinkAccountButton() {
  const classes = useStyles();

  const handleClick = () => {
    window.handler.open();
  }
  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} onClick={handleClick}>
        Link Bank Account
      </Button>
    </div>
  );
}