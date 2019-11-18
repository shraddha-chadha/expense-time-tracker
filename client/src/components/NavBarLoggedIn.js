import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { HomeCurrencyUsd } from 'mdi-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[200],
  },

  button: {
    margin: theme.spacing(2)
  },

  title: {
    flex: 1,
    margin: 15,
    fontWeight: 'bold',
    fontSize: 25
  },

  link: {
    margin: theme.spacing(1),
  },

  fab: {
    margin: theme.spacing(1)
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const preventDefault = event => event.preventDefault();

  return (
    <div id="nav-bar">
      <AppBar position="static" className={classes.root}>
        <Toolbar >
          <Fab aria-label="like" color="primary">
            <HomeCurrencyUsd />
          </Fab>
          <Typography color="primary" type="title" className={classes.title}>
            CashClock
        </Typography>

          <Typography>
            <Link href="#" onClick={preventDefault} className={classes.link}>Home</Link>
            <Link href="#" onClick={preventDefault} className={classes.link}>Dashboard</Link>
            <Link href="#" onClick={preventDefault} className={classes.link}>Analytics</Link>
            <Link href="#" onClick={preventDefault} className={classes.link}>Expenses</Link>
            <Link href="#" onClick={preventDefault} className={classes.link}>
              <Fab aria-label="like" color="default" className={classes.fab}>
                <SvgIcon color="primary">
                  <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                </SvgIcon>
              </Fab>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}