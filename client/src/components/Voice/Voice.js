import React from 'react';
import NavBar from '../NavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import Typing from 'react-typing-animation';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header';

const useStyles = makeStyles(theme => ({
}));

export default function Voice() {
  const classes = useStyles();

  return(
    <div>
      <NavBar />
      <Header title="Check out the cool features with Alexa and Gogle Home" />
    </div>
  );
}