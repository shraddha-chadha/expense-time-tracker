import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { HomeCurrencyUsd } from 'mdi-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink as Link } from "react-router-dom";
import SvgIcon from '@material-ui/core/SvgIcon';
import {Redirect} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ENV from '../env';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary,
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
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold'
  },

  'activeLink': {
    color: '#E94155',
    textDecoration: 'underline'
  },

  fab: {
    margin: theme.spacing(1)
  },

  logo: {
    color: '#3F51B5'
  }
}));

export default function TimeNavBarLoggedIn() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    window.localStorage.removeItem("webToken");
    window.localStorage.removeItem("username");
    setAnchorEl(null);
    window.location.href = ENV.frontendUrl
  };

  return (
    <div id="nav-bar">
      <AppBar position="static" className={classes.root}>
        <Toolbar >
          <Link exact to="/">
            <Fab color="default">
              <HomeCurrencyUsd className={classes.logo}/>
            </Fab>
          </Link>
          <Typography color="default" type="title" className={classes.title}>
            CashClock
        </Typography>

          <Typography>
            <Link exact to="/time" activeClassName={classes.activeLink}  className={classes.link}>Home</Link>
            <Link to="/time/transactions" activeClassName={classes.activeLink} className={classes.link}>Transactions</Link>
            <Fab aria-label="like" color="default" className={classes.fab} onClick={handleMenuClick}>
              <SvgIcon color="primary">
                <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
              </SvgIcon>
            </Fab>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}