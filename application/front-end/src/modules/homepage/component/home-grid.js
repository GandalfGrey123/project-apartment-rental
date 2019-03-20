import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function FormRow(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
    </React.Fragment>
  );
}

function NestedGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid container item xs={12} spacing={24}>
          <FormRow classes={classes} />
        </Grid>

        <Grid container item xs={12} spacing={24}>
          <FormRow classes={classes} />
        </Grid>
        <Grid container item xs={12} spacing={24}>
          <FormRow classes={classes} />
        </Grid>
      
      </Grid>
    </div>
  );
}


export default withStyles(styles)(NestedGrid);
