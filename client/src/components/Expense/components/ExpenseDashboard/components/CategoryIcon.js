import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Typography } from '@material-ui/core';
import * as map from '../../../../CategoryIconMap';

const styles = {
  icon: {
    fontSize: 30
  }
}

const useStyles = makeStyles(theme => ({

  iconButton: {
    padding: 0
  },

  text: {
    fontSize: 13
  },

  amountText: {
    fontSize: 15,
  }
}));

export default function CategoryIcon(props) {
  const classes = useStyles();
  let { category } = props;
  const ICON_MAP = map.ICON_MAP;

  return (
    <div className={classes.root}>
      <Grid container direction="column">
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

        <Grid item>
          <Typography color="textPrimary" className={classes.amountText}>
            {props.amount}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}