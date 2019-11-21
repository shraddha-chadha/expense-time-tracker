import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    boxShadow: '5px 5px 15px grey'
  },

  routerLink: {
    textDecoration: 'none'
  }
}));

export default function TimeButton() {
  const classes = useStyles();

  return (
    <div>
      <RouterLink to="/time" className={classes.routerLink}>
        <Button variant="contained" color="secondary" className={classes.button}>
          Time Tracker
      </Button>
      </RouterLink>
    </div>
  );
}