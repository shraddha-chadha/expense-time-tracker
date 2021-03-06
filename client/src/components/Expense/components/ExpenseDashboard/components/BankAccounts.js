import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import APP_ENV from '../../../../../env';
import Button from '@material-ui/core/Button';

const styles = {
  icon: {
    fontSize: 50
  }
}

// const rows = [
//   {'id': 1,'bankName':'Chase', 'accountNumber':'1234567', 'balance':'$4500'},
//   {'id': 2,'bankName':'Citi', 'accountNumber':'1234567', 'balance':'$2000'}
// ];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 350,
  },
  tableHeader: {
    fontWeight: 'bold',
    color: '#3F51B5',
    fontSize: 15
  }
}));

export default function BankAccounts(props) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);

  const fetchData = async () => {
    const USERNAME = localStorage.getItem("username");
    const TOKEN = localStorage.getItem("webToken");
    const URL = `${APP_ENV.backendUrl}/get_balance?username=${USERNAME}`;
    // Post Method
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    const response = await fetch(URL, options).then(async (response) => {
      const results = await response.json();
      if (results.status >= 200 && results.status < 300 || results.status === undefined) {
        console.log("Bank Balance Results", results);
        setRows(results.accounts);
      } else {
        console.log("ErrorResults", results);
      }
    });
  }
  //  if(USERNAME !== null) {
  //   fetchData();
  //  }
  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button onClick={fetchData} color="secondary" variant="contained" >
            Check Balance
      </Button>
        </Grid>

        <Grid item>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader} component="th" >Bank</TableCell>
                  <TableCell className={classes.tableHeader} component="th" align="right">Type</TableCell>
                  <TableCell className={classes.tableHeader} align="right" component="th" >Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.accountId}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.subtype.toUpperCase()}</TableCell>
                    <TableCell align="right">${row.balances.current}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
