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
import APP_ENV from '../../../../../env';



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

const handleactualsChange = (values) => {
//Got the actuals
}


export default function TransactionTable(props) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async() => {
    const USERNAME = localStorage.getItem("username");
    const TOKEN = localStorage.getItem("webToken");
    const URL= `${APP_ENV.backendUrl}/tasks/all/${USERNAME}?username=${USERNAME}`;
  
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
      if(results.status >= 200 && results.status < 300 || results.status === undefined) {
        console.log("Results of get Task", results);
        setRows(results);
        setLoading(false);
      } else {
        console.log("ErrorResults", results);
      }
    });
  }

  React.useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
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
                    <StyledTableRow key={row.taskId}>
                      <StyledTableCell align="right">{(row.taskName === ''|| row.taskName === null)? '-': row.taskName}</StyledTableCell>
                      <StyledTableCell align="right">{(row.taskDate === ''|| row.taskDate === null)? '-': row.taskDate}</StyledTableCell>
                      <StyledTableCell align="right">{(row.hoursEstimate === '' || row.hoursEstimate === null)? '-': row.hoursEstimate}</StyledTableCell>
                      <StyledTableCell align="right">{(row.hoursActual === '' || row.hoursActual === null)? '-': row.hoursActual}</StyledTableCell>
                      <StyledTableCell align="right">{<FillTimesheetButton data={row} parentCallback={handleactualsChange} />}</StyledTableCell>
                      <StyledTableCell align="right">{<TimeChecker estimates={row.hoursEstimate} actuals={row.hoursActual}/>}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
      ) :
      null }
    </div>
  );
}