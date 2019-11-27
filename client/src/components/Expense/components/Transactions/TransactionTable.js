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

export default function TransactionTable(props) {
  const classes = useStyles();
  let results = props.rows;

  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Transaction</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Month</StyledTableCell>
                  <StyledTableCell align="right">Quarter</StyledTableCell>
                  <StyledTableCell align="right">Year</StyledTableCell>
                  <StyledTableCell align="right">Manually Inserted</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map(row => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.transactionType}
                    </StyledTableCell>
                    <StyledTableCell align="right">{(row.name === ''|| row.name === null)? '-': row.name}</StyledTableCell>
                    <StyledTableCell align="right">{(row.transactionDate === ''|| row.transactionDate === null)? '-': row.transactionDate}</StyledTableCell>
                    <StyledTableCell align="right">{(row.transactionCategory === '' || row.transactionCategory === null)? '-': row.transactionCategory}</StyledTableCell>
                    <StyledTableCell align="right">{(row.amount === '' || row.amount === null)? '-': row.amount}</StyledTableCell>
                    <StyledTableCell align="right">{(row.month === '' || row.month === null)? '-': row.month}</StyledTableCell>
                    <StyledTableCell align="right">{(row.quarter === '' || row.quarter === null)? '-': row.quarter}</StyledTableCell>
                    <StyledTableCell align="right">{(row.year === '' || row.year === null)? '-': row.year}</StyledTableCell>
                    <StyledTableCell align="right">{row.isManuallyInserted === 1? 'Yes': 'No'}</StyledTableCell>
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