import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar, Typography,
  IconButton,
} from '@material-ui/core';

import { 
  Menu as MenuIcon,
  Info as InfoIcon
} from '@material-ui/icons';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import NewListing from './modules/listing/new-listing';
import AboutPage from './modules/about/about-page';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  render() {

    const { classes } = this.props;

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
              <Typography variant="h6" color="inherit" className={classes.grow} component={Link} to={'/'} >
                SFSU - CSC 648 Team #9 Project
              </Typography>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route path={'/about'} component={AboutPage} />
            <Route path={'/'} component={NewListing} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
