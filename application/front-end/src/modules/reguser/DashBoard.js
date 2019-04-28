import React, { Component } from 'react';
import styles from './styles/styles';

import {
    withStyles, Paper, 
    Grid, Divider, Tabs, Tab
} from '@material-ui/core'

import ProfileForm from './pages/profile-form';
import ProfileListings from './pages/profile-listings';
import AdminListings from './pages/admin-listings';
import { Route, Switch, Redirect } from 'react-router-dom';

class DashBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			from: '',
			to: 'profile',
		}
		this.handleBarNavigation = this.handleBarNavigation.bind(this);
	}

	handleBarNavigation = (event, to) => {
		let prev = this.state.to;
		if (prev !== to) {
			let prevLoc = window.location.pathname;
			prevLoc = prevLoc.substr(1, prevLoc.length);
			this.setState({
				from: prevLoc,
				to: to
			});
		}
	};

	render() {
		const { from, to } = this.state;
		const { classes } = this.props;

		return (
			<Paper>
				<Grid
					justify="space-evenly"
					container
					spacing={0}
				>
					<Tabs
						value={to}
						onChange={this.handleBarNavigation}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Profile" value={'profile'} />
						<Tab label="Listings" value={'profile/listings'} />
						<Tab label="Messages" value={'profile/messages'} />
						<Tab label="Admin" value={'profile/admin'} />
					</Tabs>
				</Grid>
				<Divider light />
				<div className={classes.content} >
					<Switch>
						<Redirect exact from={`/${from}`} to={`/${to}`} />
						<Route path={'/profile/listings'} component={ProfileListings} />
						{/* <Route path={'/profile/messages'} component={RegUserDashboarrd} /> */}
						<Route path={'/profile/admin'} component={AdminListings} />
						<Route path={'/profile'} component={ProfileForm} />
					</Switch>
				</div>
			</Paper>
		)
	}
}

export default withStyles(styles)(DashBoard);