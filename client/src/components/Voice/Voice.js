import React from 'react';
import NavBar from '../NavBarLoggedIn';
import Grid from '@material-ui/core/Grid';
import Typing from 'react-typing-animation';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

const rows = [
  { id: 1, name: 'Add Expense', utterance: '' },
  { id: 2, name: 'Set Budget', utterance: '' },
  { id: 3, name: 'Get Monthly Expense', utterance: '' },
  { id: 4, name: 'Get Quarter Expense', utterance: '' },
  { id: 5, name: 'Get Yearly Expense', utterance: '' },
  { id: 6, name: 'Get Monthly Budget', utterance: '' },
  { id: 7, name: 'Get Quarter Budget', utterance: '' },
  { id: 8, name: 'Get Yearly Budget', utterance: '' },
  { id: 9, name: 'Get Monthly Income', utterance: '' },
  { id: 10, name: 'Get Quarter Income', utterance: '' },
  { id: 11, name: 'Get Yearly Income', utterance: '' },
];

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3F51B5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
export default function Voice() {
  const classes = useStyles();

  return(
    <div>
      <NavBar title="Voice Assistants"/>
      {/* <Header title="Check out the cool features with Alexa and Gogle Home" /> */}

      <Grid container justify="center">
        <Grid item>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Utterance</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">{(row.name === ''|| row.name === null)? '-': row.name}</StyledTableCell>
                    <StyledTableCell align="right">{(row.utterance === ''|| row.date === null)? '-': row.utterance}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}