import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { HomeCurrencyUsd } from 'mdi-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { Link, animateScroll as scroll } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: theme.palette.white
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

  routerLink: {
    textDecoration: 'none'
  }
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <div id="nav-bar">
      <AppBar position="static" className={classes.root}>
        <Toolbar >
          <Fab aria-label="like" color="inherit">
            <HomeCurrencyUsd color="secondary" />
          </Fab>
          <Typography type="title" className={classes.title}>
            CashClock
        </Typography>

          <Link
            activeClass="active"
            to="register"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Button className={classes.button} variant="contained" >Register</Button>
          </Link>

          <Link
            activeClass="active"
            to="login"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Button className={classes.button} variant="contained">Login</Button>
          </Link>

          <RouterLink exact to="/expense" className={classes.routerLink}>
            <Button className={classes.button} variant="contained">Expense</Button>
          </RouterLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}