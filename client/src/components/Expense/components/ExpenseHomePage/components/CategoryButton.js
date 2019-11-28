import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  button: {
    boxShadow: '5px 5px 15px grey'
  },

  textField: {
    width: 250
  }

}));

export default function CategoryButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState('');
  const [categories, addCategory] = React.useState([
    { key: 'home', value: 'Home' },
    { key: 'food', value: 'Food' },
    { key: 'bills', value: 'Bills' },
    { key: 4, value: 'Auto' },
    { key: 5, value: 'Holidays' },
    { key: 6, value: 'Leisure' },
    { key: 7, value: 'Shopping' },
    { key: 8, value: 'Fuel' },
    { key: 9, value: 'Health' },
    { key: 10, value: 'General' }
  ]);

  const handleAddCategory = () => {
    let key = categories.length + 1;
    let cat = { 'key': key, 'value': newCategory };
    addCategory([...categories, cat]);
    setNewCategory('');
  };

  const handleSetCategory = event => {
    setNewCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen}>
        Add Category
      </Button>

      <div className="dialogContainer">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">
            Add Category
        </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} direction="column">
              {categories.map(category => (
                <Grid item key={category.key}>
                  <Typography color="black">
                    {category.value}
                  </Typography>
                </Grid>
              )
              )}
            </Grid>

            <TextField
              autoFocus
              margin="dense"
              id="expense_category"
              label="Category"
              value={newCategory}
              onChange={handleSetCategory}
              className={classes.textField}
              color="primary"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleAddCategory} color="primary">
              Add
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}