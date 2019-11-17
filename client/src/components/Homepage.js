import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Login from './Login';
import Register from './Register';
import YouTube from 'react-youtube';
import '../styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Typing from 'react-typing-animation';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden'
  },

  form: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 35
  },

  banner: {
    color: theme.palette.primary,
    height: 'calc(100vh - 68)'
  },

  bannerBackground: {
    position: 'relative'
  },

  bannerText: {
    position: 'absolute',
    color: '#EE8558',
    top: '50%',
    left: '50%',
    fontSize: 25,
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold',

  }

}));

export default function HomePage() {

  const classes = useStyles();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const videoOptions = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0
    }
  }

  const _onEnd = (event) => {
    event.target.playVideo();
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Paper className={classes.banner}>
            <div className={classes.bannerBackground}>
              <div>
              <YouTube
                videoId="mEqcala-NiE"
                opts={videoOptions}
                onEnd={_onEnd}
              />
              </div>
              <div className={classes.bannerText}>
                <Typing>
                  <span>Expense and Time Manager with Personal Voice Assistants</span>
                </Typing>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid container spacing={10} className={classes.form}>
          <Grid item xs={4}>
            <Paper>
              <Login />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Register />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}