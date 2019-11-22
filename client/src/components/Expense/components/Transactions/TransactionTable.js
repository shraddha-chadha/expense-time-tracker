import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const rows = [
  { id: 1, transaction: 'Expense', category: 'Food', amount: '500', month: 'January', quarter: '1', year: '2017' },
  { id: 2, transaction: 'Budget', category: '', amount: '500', month: 'January', quarter: '1', year: '2017' },
  { id: 3, transaction: 'Income', category: '', amount: '500', month: 'January', quarter: '1', year: '2017' }
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

export default function TransactionTable() {
  const classes = useStyles();

  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Transaction</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Month</StyledTableCell>
                  <StyledTableCell align="right">Quarter</StyledTableCell>
                  <StyledTableCell align="right">Year</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.transaction}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.category === ''? '-': row.category}</StyledTableCell>
                    <StyledTableCell align="right">{row.amount === ''? '-': row.amount}</StyledTableCell>
                    <StyledTableCell align="right">{row.month === ''? '-': row.month}</StyledTableCell>
                    <StyledTableCell align="right">{row.quarter === ''? '-': row.quarter}</StyledTableCell>
                    <StyledTableCell align="right">{row.year === ''? '-': row.year}</StyledTableCell>
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