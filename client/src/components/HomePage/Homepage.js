import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Login from './components/Login';
import Register from './components/Register';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import Typing from 'react-typing-animation';
import NavBar from '../NavBar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden'
  },

  formBackground: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 35
  },

  bannerBackground: {
    color: theme.palette.primary,
    height: 'calc(100vh - 68)'
  },

  videoBackground: {
    position: 'relative'
  },

  banner: {
    alignText: 'center'
  },

  bannerText: {
    position: 'absolute',
    color: 'white',
    top: '50%',
    left: '50%',
    fontSize: 50,
    alignText: 'center !important',
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold'
  },

  bannerp: {
    textAlign: 'center'
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
      <NavBar />

      <Grid container spacing={10}>
        <Grid item xs={12} className={classes.bannerBackground}>
          <Paper>
            <div className={classes.banner}>
              <div className={classes.bannerBackground}>
                <YouTube
                  videoId="mEqcala-NiE"
                  opts={videoOptions}
                  onEnd={_onEnd}
                />
              </div>
              <div className={classes.bannerText}>
                <Typing>
                  <div className={classes.bannerp}>
                    <p>Expense and Time Manager</p>
                    <p>with</p>
                    <p>Personal Voice Assistants</p>
                  </div>
                </Typing>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid container spacing={10} className={classes.formBackground}>
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