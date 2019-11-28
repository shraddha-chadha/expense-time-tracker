import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FillTimesheetButton from './FillTimesheetButton';
import TimeChecker from './TimeChecker';

const rows = [
  { id: 1, name: 'test', estimates: 23, actuals: 0, date: '2019-11-27' },
  { id: 2, name: 'test', estimates: 23, actuals: 0, date: '2019-11-27' },
  { id: 3, name: 'test', estimates: 23, actuals: 0, date: '2019-11-27' },
]
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

export default function TransactionTable(props) {
  const classes = useStyles();
  //let results = props.rows;

  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Estimates</StyledTableCell>
                  <StyledTableCell align="right">Actuals</StyledTableCell>
                  <StyledTableCell align="right">Fill Timesheet</StyledTableCell>
                  <StyledTableCell align="right">Time Checker</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">{(row.name === ''|| row.name === null)? '-': row.name}</StyledTableCell>
                    <StyledTableCell align="right">{(row.date === ''|| row.date === null)? '-': row.date}</StyledTableCell>
                    <StyledTableCell align="right">{(row.estimates === '' || row.estimates === null)? '-': row.estimates}</StyledTableCell>
                    <StyledTableCell align="right">{(row.actuals === '' || row.actuals === null)? '-': row.actuals}</StyledTableCell>
                    <StyledTableCell align="right">{<FillTimesheetButton />}</StyledTableCell>
                    <StyledTableCell align="right">{<TimeChecker />}</StyledTableCell>
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