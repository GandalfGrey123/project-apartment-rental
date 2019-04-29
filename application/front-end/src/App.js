import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  AppBar, Toolbar, Typography,
  IconButton,
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  Info as InfoIcon,
  AccountCircle as AccountCircleIcon,
  MoreVert as MoreIcon
} from '@material-ui/icons';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import AppBarMenu from './modules/_global/component/appbar-menu-nav';
import Maps from './modules/googlemaps/maps';
import AboutPage from './modules/about/about-page';
import HomePage from './modules/homepage/home-page';
import NewListing from './modules/listing/new-listing';
import Registration from './modules/registration/registration';
import ContactPage from './modules/contact/contact-page';
import LoginForm from './modules/login/login-form';
import ProfileDashboard from './modules/reguser/dashboard';


const styles = {
  root: {
    flexGrow: 1,
  },
};

const PROFILE_MENU_ACTIONS = [
  {
    id: 'profile',
    label: 'Profile'
  },
  {
    id: 'postings',
    label: 'Listings'
  },
  {
    id: 'new-posting',
    label: 'New Posting'
  }
];

const UNAUTHENTICATED_ACTIONS = [
  {
    id: '/login',
    label: 'Log In'
  },
  {
    id: '/register',
    label: 'Register'
  }
]

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      profileMenu: false,
      unauthenticatedMenu: false,
      anchorEl: null
    }
    this._toggleProfileMenu = this._toggleProfileMenu.bind(this);
  }

  _toggleProfileMenu = (event) => {
    const { profileMenu } = this.state;
    let state = { profileMenu: !profileMenu };
    if(event){
      state['anchorEl'] = event.currentTarget;
    }
    this.setState(state)
  }

  _toggleUnauthenticatedMenu = (event) => {
    const { unauthenticatedMenu } = this.state;
    let state = { unauthenticatedMenu: !unauthenticatedMenu };
    if(event){
      state['anchorEl'] = event.currentTarget;
    }
    this.setState(state)
  }

  render() {
    const { classes } = this.props;
    const { isLoggedIn, profileMenu,
            unauthenticatedMenu, anchorEl } = this.state;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                component={Link}
                to={'/about'}
              >
                <InfoIcon />
              </IconButton>
              <Typography variant="caption" color="inherit" className={classes.grow} component={Link} to={'/'} >
                SFSU - CSC 648 Team #9 Project
              </Typography>
                {
                  isLoggedIn ?
                  (<div>
                    <IconButton
                      aria-owns={profileMenu ? 'menu-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this._toggleProfileMenu}
                      color="inherit"
                    >
                      <AccountCircleIcon />
                    </IconButton>
                    <AppBarMenu
                      items={PROFILE_MENU_ACTIONS}
                      anchorEl={anchorEl}
                      open={profileMenu}
                      onClose={this._toggleProfileMenu}
                    />
                  </div>):
                  (<div>
                    <IconButton
                      aria-owns={unauthenticatedMenu ? 'menu-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this._toggleUnauthenticatedMenu}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                    <AppBarMenu
                      items={UNAUTHENTICATED_ACTIONS}
                      anchorEl={anchorEl}
                      open={unauthenticatedMenu}
                      onClose={this._toggleUnauthenticatedMenu}
                    />
                  </div>)
                }

            </Toolbar>
          </AppBar>

          <div className={classes.content} >
            <Switch>
              <Route path={'/about'} component={AboutPage} />
              <Route path={'/new'} component={NewListing} />
              <Route path={'/inbox'} component={ContactPage} />
	            <Route path={'/maps'} component={Maps} />
              <Route path={'/login'} component={LoginForm} />
              <Route path={'/register'} component={Registration} />
              <Route path={'/profile'} component={ProfileDashboard} />
              <Route path={'/'} component={HomePage} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
