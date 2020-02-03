import React from 'react';
import Typing from 'react-typing-animation';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(8, 0, 6),
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return(
    <div>
      {/* <Typing>
            <p className={classes.text}> {props.title} </p>
          </Typing> */}
      <Container maxWidth="sm" component="main" className={classes.title}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          {props.subtitle}
        </Typography>
      </Container>
    </div>
  );
}