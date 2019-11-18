import React from 'react';
import ActionCard from './components/ActionCard'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../../NavBarLoggedIn'
const useStyles = makeStyles(theme => ({

}));

export default function ExpenseHomePage() {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      <ActionCard />
    </div>
  );
}