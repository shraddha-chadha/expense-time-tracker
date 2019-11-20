import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const styles = {
  icon: {
    fontSize: 100
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: 25
  },

  card: {
    maxWidth: 500,
    borderStyle: 'solid',
    borderColor: '#F4F8F8',
    borderWidth: 1,
    boxShadow: '5px 5px 15px grey'
  },

  content: {
    width: 300,
    textAlign: 'center'
  },

  text: {
    fontSize: 15,
    marginBottom: 10
  },

  iconButton: {
    padding: 0
  }
}));

export default function ActionCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="cardContainer">
        <Card className={classes.card} color="default">
          <CardContent component="div" className={classes.content}>
            <Grid container direction="column" spacing={3}>
              <Grid item xs={12}>
                <IconButton className={classes.iconButton}>
                  <SvgIcon style={styles.icon} color="primary">
                    <path d={props.icon} />
                  </SvgIcon>
                </IconButton>
              </Grid>

              <Grid item xs={12}>
                <Typography color="textPrimary" className={classes.text}>
                  {props.subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12}>
               {props.button}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}