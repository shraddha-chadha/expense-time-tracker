import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Typography } from '@material-ui/core';

const styles = {
  icon: {
    fontSize: 50
  }
}
const budgetMap = {
  overbudget: {
    icon: 'M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
    title: 'Over-Budget',
    subtitle: 'You are over-budget by',
    color: '#F40057'
  },
  underbudget: {
    icon: 'M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
    title: 'Under-Budget',
    subtitle: 'You are under-budget by',
    color: '#F40057'
  }
}
const useStyles = makeStyles(theme => ({

  iconButton: {
    padding: 0
  },

  text: {
    fontSize: 20,
    marginTop: 12,
    marginLeft: 20
  },

  amountText: {
    fontSize: 15,
    marginTop: 10
  },

  icon: {
    color: '#F40057'
  },

  container: {
    marginLeft: 60,
    marginTop: 20
  }
}));

export default function BudgetChecker(props) {
  const classes = useStyles();
  let {type, amount} = props;
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

        <Grid item>
          <Typography color="textSecondary" className={classes.amountText}>
             {subtitle} ${amount.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}