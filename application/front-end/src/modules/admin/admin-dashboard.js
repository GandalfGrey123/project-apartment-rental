import React, { Component } from 'react';
import {
  Drawer, withStyles, CssBaseline,
  Divider, Checkbox, Button,
  List, ListItem, ListItemText, ListSubheader,
  Grid, TextField, EmailField
} from '@material-ui/core';
import styles from './styles/admin-dashboard';

import LaunchIcon from '@material-ui/icons/Launch', 'react-admin';


const styles1 = {
	link: { 
		textDecoration: 'none',
	},
	icon: {
		width: '0.5em',
		paddingLeft: 2,
	},
};

const MyUrlField = ({ record = {}, source, classes }) =>
	<a href={record[source]} className={classes.link}>
        {record[source]}
        <LaunchIcon className={classes.icon} />
    </a>;
	
export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);
	


class AdminDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const classes = this.props.classes;

    return (
      <div className={classes.root}>
         <div>Admin Dashboard</div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AdminDashboard);