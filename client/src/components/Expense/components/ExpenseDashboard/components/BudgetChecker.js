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
    color: 'red'
  },

  container: {
    marginLeft: 60,
    marginTop: 20
  }
}));

export default function BudgetChecker(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.container}>
        <Grid item>
          <IconButton className={classes.iconButton}>
            <SvgIcon style={styles.icon}>
              <path className={classes.icon}d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </SvgIcon>
          </IconButton>
        </Grid>

        <Grid item>
          <Typography color="textPrimary" className={classes.text}>
            OverBudget
          </Typography>
        </Grid>

        <Grid item>
          <Typography color="textSecondary" className={classes.amountText}>
            You are overbudget by $300
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}