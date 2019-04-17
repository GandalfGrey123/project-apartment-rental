import React, { Component } from 'react';
import {
  Drawer, withStyles, CssBaseline,
  Divider, Checkbox, Button,
  List, ListItem, ListItemText, ListSubheader,
  Grid,
} from '@material-ui/core';
import styles from './styles/admin-dashboard';

class AdminDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const classes = this.props.classes;

    return (
      <div className={classes.root}>
         <div>Admin Dashboard<div>
      </div>
    );
  }
}

//export default withStyles(styles, { withTheme: true })(AdminDashboard);
export default AdminDashboard;