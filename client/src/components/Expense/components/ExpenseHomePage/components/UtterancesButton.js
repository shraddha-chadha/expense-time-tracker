import React from 'react';
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

export default function UtterancesButton() {
  const classes = useStyles();

  return (
    <div>
      <RouterLink exact to="/voice" className={classes.routerLink}>
        <Button variant="contained" color="secondary" className={classes.button}>
          Voice Assistant Features
      </Button>
      </RouterLink>

    </div>
  );
}