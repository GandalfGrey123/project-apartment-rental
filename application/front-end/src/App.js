import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography,
  IconButton,
} from '@material-ui/core';
import {
  Menu as MenuIcon
} from '@material-ui/icons';
import AboutPage from './modules/about/about-page';
import { BrowserRouter } from 'react-router-dom';

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
              {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
              <Typography variant="h6" color="inherit" className={classes.grow}>
                SFSU - CSC 648 Team #9 Project test
            </Typography>
            </Toolbar>
          </AppBar>
          <AboutPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
