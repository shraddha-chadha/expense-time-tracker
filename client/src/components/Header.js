import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typing from 'react-typing-animation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  titleBackground: {
    position: 'relative',
    height: 100,
    background: "#3F50B5",
  },

  text: {
    position: 'absolute',
    left: '50%',
    top: '25%',
    transform: 'translate(-50%,-50%)',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return(
    <div>
      <Grid container>
      <Grid item xs={12} className={classes.titleBackground}>
          <Typing>
            <p className={classes.text}> {props.title} </p>
          </Typing>
        </Grid>
      </Grid>
    </div>
  );
}