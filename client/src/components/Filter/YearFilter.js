import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const years = (() => {
  let y = [];
  let current_year = new Date().getFullYear();
  let next10year = current_year + 10
  for (let i = 2000; i <= next10year; i++) {
    let temp = { key: i, value: i }
    y.push(temp);
  }
  return y;
})();

const useStyles = makeStyles(theme => ({
  root: {
    margin: 15,
    justifyContent: 'center'
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  button: {
    boxShadow: '5px 5px 15px grey',
    margin: theme.spacing(2),
  }

}));

export default function YearFilter(props) {
  const classes = useStyles();
  let date = new Date();
  const [year, setYear] = React.useState([]);

  const handleYearChange = event => {
    let value = event.target.value;
    setYear(value);
  };

  const handleSearch = () => {
    props.parentCallback(year);
  }

  return (
    <div>
      <Grid container className={classes.root} spacing={4}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="multi-year-label">
              Year
            </InputLabel>
            <Select
              labelId="multi-year-label"
              id="multi-year-select"
              multiple
              value={year}
              color="secondary"
              onChange={handleYearChange}
            >
              {years.map(menu => (
                <MenuItem key={menu.key} value={menu.key}>
                  {menu.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary" className={classes.button} onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}