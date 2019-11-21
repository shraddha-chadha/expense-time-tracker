import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Typography } from '@material-ui/core';

const styles = {
  icon: {
    fontSize: 100,
    color: "white"
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: 25
  },

  card: {
    maxWidth: 400,
    borderStyle: 'solid',
    borderColor: '#F4F8F8',
    borderWidth: 1,
    boxShadow: '5px 5px 15px grey',
    background: theme.palette.grey[100]
  },

  content: {
    width: 250,
    textAlign: 'center',
    marginBottom: 0
  },

  text: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white'
  },

  amountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E94155'
  },

  iconButton: {
    padding: 0
  },

  colorContainer: {
    background: '#3F51B5'
  }
}));

export default function DashboardCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent component="div" className={classes.content}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Grid container className={classes.colorContainer} color="primary" direction="column" spacing={3} justify="center">
                <Grid item>
                  <IconButton className={classes.iconButton}>
                    <SvgIcon style={styles.icon}>
                      <path d={props.icon} />
                    </SvgIcon>
                  </IconButton>
                </Grid>

                <Grid item>
                  <Typography color="textPrimary" className={classes.text}>
                    {props.title}
                  </Typography>
                </Grid>
              </Grid>

            </Grid>

            <Grid item xs={12}>
              <Typography color="textPrimary" className={classes.amountText}>
                {props.amount}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}