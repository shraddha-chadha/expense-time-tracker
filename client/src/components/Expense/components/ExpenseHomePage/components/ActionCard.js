import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { HomeCurrencyUsd } from 'mdi-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
  },

  content: {
    width: 350,
    textAlign: 'center'
  }
}));

export default function ActionCard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card} color="default">
          <CardContent component="div" className={classes.content}>
            <Grid container direction="column" spacing={3}>
              <Grid item xs={12}>
                <IconButton>
                  <SvgIcon style={styles.icon} color="primary">
                    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                  </SvgIcon>
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" className={classes.button}>
                  Link Bank Account
            </Button>
              </Grid>
            </Grid>
          </CardContent>
      </Card>
    </div>
  );
}