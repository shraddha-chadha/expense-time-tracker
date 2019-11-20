import React from 'react';
import NavBar from '../../../NavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import Typing from 'react-typing-animation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  titleBackground: {
    position: 'relative',
    height: 320,
    background: 'linear-gradient(180deg, #FE6B8B 30%, #FF8E53 90%)',
  },

  titleText: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    fontSize: 45,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  subtitle: {
    fontSize: 25,
    fontWeight: 'normal'
  }
}));

export default function TimeHomepage() {
  const classes = useStyles();

  return(
    <div>
      <NavBar />
      
      <Grid container>
      <Grid item xs={12} className={classes.titleBackground}>
          <Typing>
            <div className={classes.titleText}>
              <p>Time Homepage</p>
              <p className={classes.subtitle}>Track your tasks and time spent on it</p>
            </div>
          </Typing>
        </Grid>

      </Grid>
    </div>
  );
}