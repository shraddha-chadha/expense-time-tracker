import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import * as map from '../../../../CategoryIconMap';
import Badge from '@material-ui/core/Badge';

const styles = {
  icon: {
    fontSize: 30
  }
}

const BorderLinearProgress = withStyles({
  root: {
    height: 15,
    width: 250,
    backgroundColor: lighten('#E94155', 0.5),
  },

  bar: {
    borderRadius: 50,
    backgroundColor: '#E94155',
  },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 20
  },

  badge: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },

  progressContainer: {
    marginTop: 15,

  },

  iconButton: {
    padding: 0
  },

  text: {
    fontSize: 13
  },
}));

export default function ProgressBar(props) {
  const classes = useStyles();
  let { category } = props;
  const ICON_MAP = map.ICON_MAP;
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <IconButton className={classes.iconButton}>
                <SvgIcon style={styles.icon} color="primary">
                  <path d={ICON_MAP[category].icon} />
                </SvgIcon>
              </IconButton>
            </Grid>

            <Grid item>
              <Typography color="textSecondary" className={classes.text}>
                {ICON_MAP[category].title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <div className={classes.progressContainer}>
            <Badge badgeContent={`${props.amount}%`} color="primary">
              <BorderLinearProgress
                variant="determinate"
                value={parseInt(props.amount)}
              />
            </Badge>
          </div>
        </Grid>

      </Grid>
    </div>
  );
}