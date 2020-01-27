import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { HomeCurrencyUsd } from 'mdi-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink as Link } from "react-router-dom";
import SvgIcon from '@material-ui/core/SvgIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ENV from '../env';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  },

  logo: {
    flex: 1,
    margin: 15,
    fontWeight: 'bold',
    fontSize: 25,
    color: theme.palette.primary
  },

  title: {
    textAlign: 'center',
    color: theme.palette.primary,
    fontSize: 25,
    fontWeight: 'bold',
  },

  subtitle: {
    textAlign: 'center',
    color: theme.palette.primary,
    fontSize: 15,
  },

  link: {
    margin: theme.spacing(1),
    textDecoration: 'none',
    color: "white",
    fontWeight: 'bold'
  },

  'activeLink': {
    color: '#E94155',
    textDecoration: 'underline'
  },

  fab: {
    margin: theme.spacing(1)
  }
}));

export default function NavBarLoggedIn(props) {
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
            <Fab aria-label="like" color="default">
              <HomeCurrencyUsd color="primary" />
            </Fab>
          </Link>

          <Typography type="title" className={classes.logo}>
          {props.title}
          </Typography>

          {/* <Grid container direction="column" alignContent="center" >
            <Grid item>
              <Typography type="title" className={classes.title}>
                {props.title}
              </Typography>
            </Grid>

            <Grid item>
              <Typography type="subtitle" className={classes.subtitle}>
                {props.subtitle}
              </Typography>
            </Grid>
          </Grid> */}

          <Grid container direction="row" justify="flex-end" alignItems="baseline" >
            <Grid item>
              <Typography>
                <Link exact to="/expense" activeClassName={classes.activeLink} className={classes.link}>Home</Link>
                <Link to="/expense/dashboard" activeClassName={classes.activeLink} className={classes.link}>Dashboard</Link>
                <Link to="/expense/analytics" activeClassName={classes.activeLink} className={classes.link}>Insights</Link>
                <Link to="/expense/transactions" activeClassName={classes.activeLink} className={classes.link}>Transactions</Link>
              </Typography>
            </Grid>

            <Grid item>
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}