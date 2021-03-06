import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Typography } from '@material-ui/core';

const styles = {
  icon: {
    fontSize: 41,
    marginBottom: 10
  }
}
const budgetMap = {
  overShoot: {
    icon: 'M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
    title: 'OverShoot',
    subtitle: 'You are over-budget by',
    color: 'red'
  },
  underShoot: {
    icon: 'M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
    title: 'UnderShoot',
    subtitle: 'You are under-budget by',
    color: 'green'
  }
}
const useStyles = makeStyles(theme => ({

  iconButton: {
    padding: 0
  },

  text: {
    fontSize: 14,
    color: 'grey',
    marginTop: 12,
    marginLeft: 20
  },

  amountText: {
    fontSize: 15,
    marginTop: 10
  },

  icon: {
    color: 'red'
  },

  container: {
    marginLeft: 60,
    marginTop: 20
  }
}));

export default function TimeChecker(props) {
  const classes = useStyles();
  let type = ''
  let {estimates, actuals} = props;
  let delta = estimates - actuals;
  console.log("Delta ", delta);

  if(delta > 0) {
    type = 'underShoot';
  } else {
    type = 'overShoot';
  }
  let iconColor = budgetMap[type].color;
  let icon = budgetMap[type].icon;
  let title = budgetMap[type].title;
  let subtitle = budgetMap[type].subtitle;
  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.container}>
        <Grid item>
          <IconButton className={classes.iconButton}>
            <SvgIcon style={styles.icon}>
              <path style={{color: iconColor}} d={icon} />
            </SvgIcon>
          </IconButton>
        </Grid>

        <Grid item>
          <Typography color="textPrimary" className={classes.text}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}